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
  console.log("query", query);

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

  console.log("pipeline", pipeline);
  const results = await Model.aggregate(pipeline);

  return {
    data: results[0].data,
    totalCount: results[0].totalCount[0]?.count || 0,
  };
};

/*
* This code defines a function named `dynamicSearch` that performs a dynamic search operation using MongoDB aggregation pipeline. Here's a breakdown of what the function does: 

* The $unwind stage in MongoDB’s aggregation framework is used to deconstruct an array field from the input documents to output a document for each element. This is particularly useful when you have nested arrays and you want to flatten them for further processing.

In the context of the code I provided earlier, the $unwind stage is used to handle the results of the $lookup stages, ensuring that each element in the array is treated as a separate document. 

* The $facet stage in MongoDB’s aggregation framework allows you to process multiple aggregation pipelines within a single stage on the same set of input documents. This is particularly useful for creating multi-faceted aggregations, which can categorize data across multiple dimensions in a single query.

Key Features of $facet:
Multiple Pipelines: You can define multiple sub-pipelines, each with its own set of stages, and the results are stored in separate fields in the output document.
Single Pass: The input documents are passed to the $facet stage only once, making it efficient.
Independent Sub-Pipelines: Each sub-pipeline operates independently on the same set of input documents.

The $unwind stage in MongoDB’s aggregation framework is used to deconstruct an array field from the input documents to output a document for each element. This is particularly useful when you have nested arrays and you want to flatten them for further processing.

Key Features of $unwind:
Deconstructs Arrays: Converts each element in an array into a separate document.
Preserve Null and Empty Arrays: Optionally, you can preserve documents where the array field is null, missing, or an empty array.
Include Array Index: You can include the array index in the output documents.
Syntax:
You can use $unwind with a simple field path or with additional options:

eg: 
{
  "_id": 1,
  "item": "ABC1",
  "sizes": ["S", "M", "L"]
}
db.inventory.aggregate([
  { $unwind: "$sizes" }
])

{ "_id": 1, "item": "ABC1", "sizes": "S" }
{ "_id": 1, "item": "ABC1", "sizes": "M" }
{ "_id": 1, "item": "ABC1", "sizes": "L" }

*/
