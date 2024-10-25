module.exports.dynamicSearch = async (
  Model,
  searchParams,
  page = 1,
  limit = 10,
  caseSensitiveData = {},
  lookups = [] // Array of lookup stages
) => {
  const query = Object.keys(searchParams).reduce((acc, param) => {
    acc[param] = caseSensitiveData[param]
      ? { $eq: searchParams[param] }
      : { $regex: searchParams[param], $options: "i" }; //i is used for case insensitive
    //  { $regex: `^${searchParams[param]}$`, $options: "i" }; //return exact match

    return acc;
  }, {});

  const skip = (page - 1) * limit;

  // Base aggregation pipeline
  const pipeline = [
    { $match: query },
    ...lookups.map((lookup) => ({
      $lookup: {
        from: lookup.from,
        localField: lookup.localField,
        foreignField: Array.isArray(lookup.foreignField)
          ? { $in: lookup.foreignField }
          : lookup.foreignField,
        as: lookup.as,
        pipeline: lookup.pipeline || [], // Nested pipeline for child lookups
      },
    })),
    {
      $facet: {
        data: [
          { $sort: { updatedAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const results = await Model.aggregate(pipeline);

  return {
    data: results[0].data,
    totalCount: results[0].totalCount[0]?.count || 0,
  };
};
