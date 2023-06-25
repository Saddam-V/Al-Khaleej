const StockHistory = require("../models/stockHistoryModel");
const APIFeatures = require("../utils/apiFeatures");
const totalStockController = require("../controllers/totalStockController");
const Cat = require("../models/catModel");

exports.createStock = async (req, res) => {
  try {
    // console.log("Creating StockHistory");
    // console.log(req.body);

    const doc = await Cat.findOne({ catNum: req.body.catNum });

    if (doc === null) {
      throw "No catalog";
    } else {
      const arr = doc.orders;
      let flag = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].colNum === req.body.colNum) {
          flag = 1;
        }
      }

      if (flag === 1) {
        const newStock = await StockHistory.create(req.body);
        await totalStockController.updateStock(req, res);
        res.status(200).json({
          status: "success",
          data: {
            stock: newStock,
          },
        });
      } else {
        throw "color not found";
      }
    }
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
    const features = new APIFeatures(StockHistory.find(), req.query).filter().sort().limitFields().paginate();
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
    const stock = await StockHistory.findById(req.params.id);
    // StockHistory.findOne({ _id: req.params.id })

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

exports.updateStock = async (req, res) => {
  try {
    const stock = await StockHistory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

exports.deleteStock = async (req, res) => {
  try {
    await StockHistory.findByIdAndDelete(req.params.id);

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

exports.getStockHistorySearch = async (req, res) => {
  try {
    const cat = req.params.cat * 1;
    const col = req.params.col;
    let stocks;
    // console.log(cat);
    if (col === "undefined") {
      stocks = await StockHistory.aggregate([
        {
          $match: { $or: [{ catNum: cat }, { colNum: cat }, { meter: cat }, { startDates: req.params.cat }] },
        },
      ]);
    } else {
      console.log("in 2");
      stocks = await StockHistory.aggregate([
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
