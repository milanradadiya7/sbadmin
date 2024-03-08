const ProductModel = require("../models/productModel");

async function userProductCreate(req, res) {
    var data = req.body;
    var product = await ProductModel.create({
        productName: data.productname,
        ProductDescription: data.Productdescription,
        categories: data.categories,
        productPrice: data.productPrice,
        productRating: data.productRatings,
        productSizeandColor: data.sizecolor,
        productBrand: data.productBrand,
        productWarranty: data.productwarranty,
        productReview: data.productReviews,
    });
    res.json({
        status: true,
        message: "Product Created",
        data: product
    });
};

async function userProduct(req, res) {
    var product = await ProductModel.findOne({ _id: req.body.id });
    res.json({
        status: true,
        message: "Product get",
        data: product
    });
    console.log(product, "product loggg.,,,");
};

async function getproductUpdate(req, res) {
    var getProductUpdate = await ProductModel.findOne({ _id: req.body.id });
    res.json({
        status: true,
        message: "Product Updated",
        data: getProductUpdate
    });
}

async function postproductUpdate(req, res) {
    var data = req.body;
    console.log(req.body);
    var updateProduct = await ProductModel.updateOne({}, {
        productName: data.productname,
        ProductDescription: data.Productdescription,
        categories: data.categories,
        productPrice: data.productPrice,
        productRating: data.productRatings,
        productSizeandColor: data.sizecolor,
        productBrand: data.productBrand,
        productWarranty: data.warranty,
        productReview: data.productReviews,
    });
    res.json({
        status: true,
        message: "Product Updated",
        data: updateProduct
    });
};



module.exports = {
    userProductCreate,
    userProduct,
    postproductUpdate,
    getproductUpdate
}