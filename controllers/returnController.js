const returnOrder = require("../models/returnModel");
const APIFeatures = require("../utils/apiFeatures");
const TotalStock = require("../models/totalStockModel");
const Cat = require("../models/catModel");

exports.createReturn = async (req, res) => {
  try {
    // console.log("Creating returnOrder");
    // console.log(req.body);

    const doc = await Cat.findOne({ catNum: req.body.catNum });
    const totalStockDoc = await TotalStock.findOne({ catNum: req.body.catNum, colNum: req.body.colNum });

    // console.log(totalStockDoc);
    if (doc === null) {
      // TODO: Needs fixing - crash on giving string arguments
      throw 404;
    } else {
      totalStockDoc.meter = parseFloat(totalStockDoc.meter) + parseFloat(req.body.meter);
      totalStockDoc.totalSold = parseFloat(totalStockDoc.totalSold) - parseFloat(req.body.meter);
      // console.log("this is doc");
      // console.log(totalStockDoc);
      await TotalStock.findOneAndUpdate({ catNum: req.body.catNum, colNum: req.body.colNum }, totalStockDoc, {
        new: true,
        runValidators: true,
      });
    }

    if (doc === null) {
      throw "No catalog";
    } else {
      const arr = doc.orders;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].colNum === req.body.colNum) {
          const rate = arr[i].rate;
          req.body.rate = rate;
          await returnOrder.create(req.body);

          res.status(201).json({
            status: "success",
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllReturn = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(returnOrder.find(), req.query).filter().sort().limitFields().paginate();
    const retrns = await features.query;

    res.status(200).json({
      status: "success",
      results: retrns.length,
      data: {
        retrns,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getReturn = async (req, res) => {
  try {
    const retrn = await returnOrder.findById(req.params.id);
    // returnOrder.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: {
        retrn,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateReturn = async (req, res) => {
  try {
    const retrn = await returnOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        retrn,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteReturn = async (req, res) => {
  try {
    await returnOrder.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getReturnSearch = async (req, res) => {
  try {
    const cat = req.params.cat;
    console.log(cat);

    const retrns = await returnOrder.aggregate([
      {
        $match: {
          $or: [{ custName: cat }, { custNum: cat }, { catNum: cat }, { colNum: cat }, { meter: cat }, { startDates: req.params.cat }],
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        retrns,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
