export async function dynamicSearch(
  Model: any,
  searchParams: Record<string, any>,
  page = 1,
  limit = 10,
  caseSensitiveData: Record<string, boolean> = {},
  lookups: Array<any> = []
) {
  const query = Object.keys(searchParams).reduce<Record<string, any>>(
    (acc, param) => {
      acc[param] = caseSensitiveData[param]
        ? { $eq: searchParams[param] }
        : { $regex: searchParams[param], $options: "i" };
      return acc;
    },
    {}
  );

  const skip = (page - 1) * limit;

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
        pipeline: lookup.pipeline || [],
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
}

