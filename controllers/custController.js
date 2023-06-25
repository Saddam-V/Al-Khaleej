const APIFeatures = require("../utils/apiFeatures");
const Cust = require("../models/custModel");

exports.createCust = async (req, res) => {
  //   try {
  // const newCust = new Cust({})
  // newCust.save()
  const newobj = {
    custName: req.custName,
    custNum: req.custNum,
  };
  const newCust = await Cust.create(newobj);
  //   } catch (err) {
  //     throw err;
  //   }
};

exports.getAllCust = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Cust.find(), req.query).filter().sort().limitFields().paginate();
    const custs = await features.query;

    res.status(200).json({
      status: "success",
      results: custs.length,
      data: {
        custs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getCustSearch = async (req, res) => {
  try {
    const cat = req.params.cat;

    const custs = await Cust.aggregate([
      {
        $match: { $or: [{ custName: cat }, { custNum: cat }, { startDates: cat }] },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        custs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
