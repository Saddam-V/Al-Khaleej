const APIFeatures = require("../utils/apiFeatures");
const totalStockController = require("../controllers/totalStockController");
const custController = require("../controllers/custController");
const Bill = require("../models/billModel");
var fs = require("fs");
const Cat = require("../models/catModel");
const Cust = require("../models/custModel");

exports.findRate = async (req, res) => {
  try {
    const doc = await Cat.findOne({ catNum: req.body.catNum });

    if (doc === null) {
      throw "No catalog";
    } else {
      const arr = doc.orders;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].colNum === req.body.colNum) {
          const rate = arr[i].rate;
          res.send(rate.toString());
        }
      }
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.validateData = async (req, res) => {
  // console.log("in validation");
  // console.log(req.body);

  try {
    await totalStockController.billValidate(req, res);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getNumber = async (req, res) => {
  try {
    const doc = await Cat.findOne({ catNum: req.params.custName });

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createBill = async (req, res) => {
  const data = req.body.orders;
  // var str = fs.readFileSync(`${__dirname}/../dev-data/billNo.txt`, "utf8"); // This will block the event loop, not recommended for non-cli programs.
  // console.log("result read: " + str);
  // try {
  for (let index = 0; index < data.length; index++) {
    await totalStockController.billCreated(data[index], res);
  }
  let prc = 0;
  for (let index = 0; index < data.length; index++) {
    data[index] = JSON.parse(data[index]);
    prc = prc + parseFloat(data[index].meter) * parseFloat(data[index].rate);
  }

  prc = prc - data[data.length - 1].priceDiscount;

  myobj = {
    custName: data[0].custName,
    custNum: data[0].custNum,
    orders: data,
    price: prc.toString(),
    priceDiscount: data[data.length - 1].priceDiscount,
  };
  const doc = await Cust.findOne({ custName: data[0].custName });
  if (doc === null) {
    myobj2 = {
      custName: data[0].custName,
      custNum: data[0].custNum,
    };
    // console.log(myobj2);
    await custController.createCust(myobj, res);
  }
  await Bill.create(myobj);

  // newstr = parseInt(str) += 1;
  // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, newstr);
  // res.statusMessage = str.toString();
  res.status(200).json({
    data: myobj,
  });
  // } catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
};

exports.getAllBill = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Bill.find(), req.query).filter().sort().limitFields().paginate();
    const bills = await features.query;

    res.status(200).json({
      status: "success",
      results: bills.length,
      data: {
        bills,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    // Bill.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: {
        bill,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        bill,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);

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

exports.getBillSearch = async (req, res) => {
  try {
    const cat = req.params.cat;

    const bills = await Bill.aggregate([
      {
        $match: { $or: [{ custName: cat }, { custNum: cat }, { startDates: cat }] },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        bills,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
