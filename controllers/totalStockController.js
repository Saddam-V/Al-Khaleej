const TotalStock = require("../models/totalStockModel");
const APIFeatures = require("../utils/apiFeatures");

exports.createStock = async (req, res) => {
  try {
    // console.log("Creating TotalStock");
    // console.log(req.body);
    const newStock = await TotalStock.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        stock: newStock,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllStock = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(TotalStock.find(), req.query).filter().sort().limitFields().paginate();
    const stocks = await features.query;

    res.status(200).json({
      status: "success",
      results: stocks.length,
      data: {
        stocks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getStock = async (req, res) => {
  try {
    const stock = await TotalStock.findById(req.params.id);
    // TotalStock.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: {
        stock,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.billValidate = async (req, res) => {
  // console.log("in totalstock");
  const doc = await TotalStock.findOne({ catNum: req.body.catNum, colNum: req.body.colNum });
  if (doc === null || parseFloat(doc.meter) - parseFloat(req.body.meter) < 0) {
    //  Needs fixing - crash on giving string arguments  --- Fixed
    throw 404;
  }
};

exports.billCreated = async (req, res) => {
  req = JSON.parse(req);
  // console.log(req);

  const doc = await TotalStock.findOne({ catNum: req.catNum, colNum: req.colNum });

  // console.log(doc);
  if (doc === null || parseFloat(doc.meter) - parseFloat(req.meter) < 0) {
    // TODO: Needs fixing - crash on giving string arguments
    throw 404;
  } else {
    doc.meter = parseFloat(doc.meter) - parseFloat(req.meter);
    doc.totalSold = parseFloat(doc.totalSold) + parseFloat(req.meter);
    // console.log("this is doc");
    // console.log(doc);
    await TotalStock.findOneAndUpdate({ catNum: req.catNum, colNum: req.colNum }, doc, {
      new: true,
      runValidators: true,
    });
  }
};
exports.updateStock = async (req, res) => {
  try {
    await TotalStock.findOne({ catNum: req.body.catNum, colNum: req.body.colNum }, async function (err, doc) {
      // console.log(doc);
      if (doc === null) {
        try {
          // console.log("Creating TotalStock");
          // console.log(req.body);
          req.body.totalSold = 0;
          const newStock = await TotalStock.create(req.body);

          // res.status(201).json({
          //   status: "success",
          //   data: {
          //     stock: newStock,
          //   },
          // });
        } catch (err) {
          throw err;
          // res.status(400).json({
          //   status: "failed",
          //   message: err,
          // });
        }
      } else {
        doc.meter = parseFloat(req.body.meter) + parseFloat(doc.meter);
        // console.log("this is doc");
        // console.log(doc);
        const stock = await TotalStock.findOneAndUpdate({ catNum: req.body.catNum, colNum: req.body.colNum }, doc, {
          new: true,
          runValidators: true,
        });

        // res.status(200).json({
        //   status: "success",
        //   data: {
        //     stock,
        //   },
        // });
      }
    });
  } catch (err) {
    throw err;
    // res.status(404).json({
    //   status: "fail",
    //   message: err,
    // });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    await TotalStock.findByIdAndDelete(req.params.id);

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

exports.getTotalStockSearch = async (req, res) => {
  try {
    const cat = req.params.cat * 1;
    const col = req.params.col;
    console.log("this is col", col);

    let stocks;

    if (col === "undefined") {
      console.log("in 1");
      stocks = await TotalStock.aggregate([
        {
          $match: { catNum: cat },
        },
      ]);
    } else {
      console.log("in 2");
      stocks = await TotalStock.aggregate([
        {
          $match: { catNum: cat, colNum: col },
        },
      ]);
    }
    res.status(200).json({
      status: "success",
      data: {
        stocks,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
