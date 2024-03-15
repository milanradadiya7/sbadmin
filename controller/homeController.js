const ProductModel = require("../models/productModel");
const UserModel = require("../models/userModel");
const nodemailer = require("nodemailer")

function dashboard(req, res) {
    res.render("dashboard");
};

function button(req, res) {
    res.render("components/button");
};

function card(req, res) {
    res.render("components/card");
};

function color(req, res) {
    res.render("utilities/color");
};

function border(req, res) {
    res.render("utilities/border");
};

function animation(req, res) {
    res.render("utilities/animation");
};

function other(req, res) {
    res.render("utilities/other");
};

function forgotPassword(req, res) {
    res.render("pages/loginScreen/forgotPassword", { layout: "layout/authLayout/authLayer" });
};

async function sendMail(req, res) {
    var data = req.body;
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "30716c5f4eba45",
            pass: "2dd47595c24c6b",

        }
    });
    var resetpassword = "http://127.0.0.1:7878/resetPassword";
    await transporter.sendMail({
        from: data.email,
        to: data.email,
        subject: "Reset Password",
        html: "<html>" +
            "<body>" +
            "<p>Hello,</p>" +
            "<p>You have requested to reset your password. Click the button below to reset it:</p>" +
            "<a href='" + resetpassword + "'>" +
            "<button style='background-color: #007bff; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;'>" +
            "Reset Password" +
            "</button>" +
            "</a>" +
            "<p>If you didn't request this, please ignore this email.</p>" +
            "</body>" +
            "</html>"
    });
    res.send("<center><h3>Forgot password send in email</h3></center>");
};

function resetPasswordget(req, res) {
    res.render("pages/loginScreen/resetPassword", { layout: "layout/authLayout/authLayer" });
};

async function resetPasswordpost(req, res) {
    var data = req.body;
    var updatePass = await UserModel.updateOne({ _id: data.id }, {
        password: data.password
    });
    console.log(data.id, "resetpass id log....");
    console.log(updatePass, "updatePass.................");
    res.redirect("/dashboard");
};

function error(req, res) {
    res.render("pages/otherPages/404Error");
};

async function product(req, res) {
    var product = await ProductModel.find({});
    res.render("pages/otherPages/product", { product });
};

async function productCreateget(req, res) {
    res.render("pages/otherPages/productCreate", { layout: "layout/authLayout/authLayer" });
}

async function productCreatepost(req, res) {
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

    console.log(product, "productlist.................................");
    res.redirect("/product");
};

async function removeData(req, res) {
    var id = req.query.id;
    var delData = await ProductModel.deleteOne({
        _id: id
    });
    console.log(delData, "Delete Data............");
    res.redirect("/product");
};

async function productUpdateget(req, res) {
    var user = await ProductModel.findOne({ _id: req.query.id });
    res.render("pages/otherPages/productUpdate", { user, layout: "layout/authLayout/authLayer" });
}

async function productUpdatepost(req, res) {
    var data = req.body;
    var updateUser = await ProductModel.updateOne({ _id: data.id }, {
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
    console.log(updateUser, "updateUser.................");
    res.redirect("/product");
};

function chart(req, res) {
    res.render("charts");
};

// user table show kare start ............................................
async function table(req, res) {
    // var user = await UserModel.find({});
    // const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    // const pageSize = 5; // Number of items per page


    // var user = await UserModel.paginate({}, { page: pageNumber, limit: pageSize }, (err, result) => {
    //     if (err) {
    //         return res.status(500).json({ message: 'Error occurred while fetching users.' });
    //     }
    //     // const { docs, total, limit, page, pages } = result;
    //     // res.json({ users: docs, total, limit, page, pages });
    //     console.log(result, "result.............");
    //     res.render("tables", {
    //         a: result,  // a define in table page
    //     });
    // });

    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 5);

    var skip = (page - 1) * limit;

    let user = await UserModel.find({}).skip(skip).limit(limit);
    var count = await UserModel.countDocuments({});
    var totalPages = Math.ceil(count / limit);

    var pData = {
        status: true,
        data: user,
        totalPages: totalPages,
        currentPage: page,
        nextPage: page + 1 > totalPages ? false : page + 1,
        prevPage: page - 1 >= 1 ? page - 1 : false,
        message: "success"
    };
    res.render("tables", { pData })
};
// user table show kare end ...................................................

async function adProfile(req, res) {
    var adminprofile = await UserModel.findOne({});
    console.log(adminprofile, "adminprofile...........");
    res.render("adminProfile", { adminprofile, layout: "layout/authLayout/authLayer" })
}


// profile page show kare start ...............................................
async function profile(req, res) {
    var user = await UserModel.findOne({ _id: req.query.id });
    console.log(user, "userprofile===================");
    res.render("profile", { user, layout: "layout/authLayout/authLayer" });
};
// profile page show kare end .................................................

// user id delete kare start ..................................................
async function remove(req, res) {
    var id = req.query.id;
    var delUser = await UserModel.deleteOne({ _id: id });
    console.log(delUser, "Delete user....................");
    res.redirect("/table");
}
// user id delete kare end ....................................................

// user id update kare start ..................................................
async function updateProfile(req, res) {
    var data = req.body;
    var updateUser = await UserModel.updateOne({ _id: data.id }, {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password
    });
    console.log(updateUser, "updateUser.................");
    res.redirect("/dashboard");
};
// user id update kare end ...............................................

module.exports = {
    dashboard,
    button,
    card,
    color,
    border,
    animation,
    other,
    forgotPassword,
    resetPasswordget,
    resetPasswordpost,
    error,
    product,
    productCreateget,
    productCreatepost,
    removeData,
    productUpdateget,
    productUpdatepost,
    chart,
    table,
    remove,
    updateProfile,
    profile,
    adProfile,
    sendMail
}