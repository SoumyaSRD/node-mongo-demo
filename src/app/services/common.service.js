module.exports.dynamicSearch = async (
  Model,
  searchParams,
  page = 1,
  limit = 10,
  caseSensitiveData = {}
) => {
  const query = Object.keys(searchParams).reduce((acc, param) => {
    console.log("bef", acc);

    acc[param] = caseSensitiveData[param]
      ? { $eq: searchParams[param] }
      : { $regex: `^${searchParams[param]}$`, $options: "i" };
    console.log("af", acc);
    return acc;
  }, {});

  const skip = (page - 1) * limit;

  const results = await Model.aggregate([
    { $match: query },
    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  return {
    data: results[0].data,
    totalCount: results[0].totalCount[0]?.count || 0,
  };
};
