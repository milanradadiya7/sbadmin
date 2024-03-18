const express = require('express');
const { dashboard, button, card, color, border, animation, other, forgotPassword, error, product, productCreateget, productCreatepost, chart,
    table, remove, updateProfile, profile, sendMail, resetPasswordget, resetPasswordpost, removeData, productUpdateget, productUpdatepost, adProfile } = require('./controller/homeController');
const { loginget, loginpost, registerget, registerpost, logOut } = require('./controller/userController');
const { userTable, userRegister, userlogin, userProfileUpdate, userRemove, userProfileget, userProfile } = require('./ApiController/userApiController');
const { userProduct, userProductCreate, getproductUpdate, postproductUpdate } = require('./ApiController/productApiController');
const jwt = require('jsonwebtoken');
const route = express.Router();

// token verify in user 0
function verify(req, res, next) {
    var token = req.headers.authorization;
    console.log(token, "token get.....");
    if (!token) {
        res.json({
            status: false,
            message: "provide token"
        });
    }

    try {
        req.payload = jwt.verify(token, 'key');
        next()
    } catch (error) {
        console.log(error, 'error in md');
        res.json({
            status: false,
            message: error
        });
    };
};


route.get("/dashboard", dashboard);
route.get("/button", button);
route.get("/card", card);
route.get("/color", color);
route.get("/border", border);
route.get("/animation", animation);
route.get("/other", other);
route.get("/login", loginget);
route.post("/login", loginpost);
route.get("/register", registerget);
route.post("/register", registerpost);
route.get("/forgotPassword", forgotPassword);
route.post("/forgotPassword", sendMail);
route.get("/resetPassword/:userId/:token", resetPasswordget);
route.post("/resetPassword/:userId/:token", resetPasswordpost);
route.get("/404Error", error);
route.get("/product", product);
route.get("/productCreate", productCreateget);
route.post("/productCreate", productCreatepost);
route.get("/deleteData", removeData);
route.get("/productUpdate", productUpdateget);
route.post("/productUpdate", productUpdatepost);
route.get("/chart", chart);
route.get("/table", table);
route.get("/delete", remove);
route.get("/profile", profile);
route.get("/ad-profile", adProfile);
route.post("/update", updateProfile);
route.get("/logout", logOut);


route.post("/api/user-register", userRegister);
route.post("/api/user-login", userlogin);
route.get("/api/user-profile", verify, userProfileget);
route.get("/api/profile-user/:userId", userProfile);
route.post("/api/user-profile-update", userProfileUpdate);
route.get("/api/user-table", userTable);
route.get("/api/user-product", userProduct);
route.post("/api/user-productcreate", userProductCreate);
route.get("/api/user-product-update", getproductUpdate);
route.post("/api/user-product-update", postproductUpdate);
route.get("/api/user-remove", userRemove);


module.exports = {
    route
}