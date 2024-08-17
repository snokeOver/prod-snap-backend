import errorHandler from "../../helper/errorHandler.js";
import MobileModel from "../../schemas/mobileSchema.js";

export const getAllMobileData = async (req, res, next) => {
  const curPage = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 8;
  const search = req?.query?.search || "";
  const category = req?.query?.category || "";
  const sort = req?.query?.sort || "";

  const match = {
    name: { $regex: search, $options: "i" }, // Search by title
  };

  // add category filter if provided
  if (category) {
    match.brand = category;
  }

  // add soft field if provided
  let sortOption = {};
  if (sort) {
    const [sortField, sortOrder] = sort.split(":");
    const order = sortOrder === "des" ? -1 : 1;
    if (sortField === "price") {
      sortOption.price = order;
    } else if (sortField === "creation") {
      sortOption.createdAt = order;
    }
  }

  try {
    const pipeline = [
      { $match: match },

      {
        $facet: {
          paginatedResults: [
            // Conditionally add the sort stage if sortOption has keys
            ...(Object.keys(sortOption).length > 0
              ? [{ $sort: sortOption }]
              : []),
            { $skip: (curPage - 1) * size },
            { $limit: size },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const [results] = await MobileModel.aggregate(pipeline);
    const responseData = results.paginatedResults;
    const totalMatchedItems = results.totalCount[0]?.count || 0; // Get the total count from the facet result

    const response = [responseData, totalMatchedItems];

    // console.log(response);

    res.status(200).send({
      message: "Mobile Data retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
