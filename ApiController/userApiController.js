const UserModel = require("../models/userModel");
var jwt = require('jsonwebtoken');

async function userRegister(req, res) {
    var data = req.body;
    var userCreate = await UserModel.create({
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password
    });
    console.log(userCreate, "usercreate.......");
    res.json({
        status: true,
        message: "Register Created",
        data: userCreate
    });
};

async function userlogin(req, res) {
    var data = req.body
    console.log(data.email);
    console.log(data.password);
    var loginUser = await UserModel.findOne({
        email: data.email,
        password: data.password
    });
    const loginuser = {
        _id: loginUser._id,
        firstName: loginUser.firstname,
        lastName: loginUser.lastname,
        email: loginUser.email,
        password: loginUser.password
    }
    console.log(loginUser, "userlist....................");

    if (loginUser == null) {
        res.json({
            status: false,
            message: "Login Failed: User not found",
            data: loginUser
        });
    } else {
        var token = jwt.sign(loginuser, 'key');
        res.json({
            token: token,
            status: true,
            message: "Login Success",
            data: loginUser
        });
    }

};

async function userProfileget(req, res) {
    var token = req.body.token;
    console.log(token, "token");
    var uprofile = jwt.verify(token, 'key');
    var user = await UserModel.findOne({ _id: uprofile._id });
    console.log(user, "userprofileget..........");
    res.json({
        status: true,
        message: "Profile Find",
        data: user
    });
};

async function userProfilepost(req, res) {
    var token = req.body.token;
    console.log(token, "token");
    var decoded = jwt.verify(token, 'key');
    var user = await UserModel.findOne({ _id: decoded._id });
    console.log(user, "userprofile===================");
    res.json({
        status: true,
        message: "Profile Created",
        data: user
    })
};

async function userTable(req, res) {
    var usertable = await UserModel.find({});
    console.log(usertable);
    res.json({
        status: true,
        message: "Usertable Created",
        data: usertable
    });
};

async function userProfileUpdate(req, res) {
    var data = req.header;
    var updateUser = await UserModel.updateOne({ _id: data.id }, {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password
    });
    res.json({
        status: true,
        message: "User Updated",
        data: updateUser
    });
};

async function userRemove(req, res) {
    var id = req.query.id;
    var removeUser = await UserModel.deleteOne({
        _id: id
    });
    res.json({
        status: true,
        message: "User Removed",
        data: removeUser
    });
}


module.exports = {
    userRegister,
    userProfileget,
    userProfilepost,
    userTable,
    userlogin,
    userProfileUpdate,
    userRemove
}