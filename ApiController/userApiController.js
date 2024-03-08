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

async function userProfile(req, res) {
    var user = await UserModel.findOne({});
    console.log(user, "userprofile===================");
    var token = req.body.token;
    console.log(token, "token");
    var decoded = jwt.verify(token, 'key');
    res.json({
        status: true,
        message: "Profile Created",
        Data: decoded,
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

async function userlogin(req, res) {
    var loginUser = await UserModel.findOne({});
    console.log(loginUser, "userlist....................");
    req.session.user = loginUser;
    console.log(req.session.user, "user session ..........................");

    var token = jwt.sign(req.body, 'key');
    res.json({
        token: token,
        status: true,
        message: "Login Created",
        data: loginUser
    });
};

async function userProfileUpdate(req, res) {
    var data = req.body;
    var updateUser = await UserModel.updateOne({}, {
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
    userProfile,
    userTable,
    userlogin,
    userProfileUpdate,
    userRemove
}