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
        _id: loginUser.id,
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
    var user = await UserModel.findOne({ _id: req.payload._id });
    console.log(req.payload_id, "payload token............");
    console.log(user, "userprofileget..........");
    res.json({
        status: true,
        message: "Profile Find",
        data: user
    });
};


async function userProfile(req, res) {
    var uProfile = await UserModel.findOne({ _id: req.params.userId});
    console.log(uProfile, "user.....profile...");
    res.json({
        status: true,
        message: "user get",
        data: uProfile
    })
}

async function userTable(req, res) {
    var usertable = await UserModel.find({});
    console.log(usertable, "usertable.....");
    res.json({
        status: true,
        message: "Usertable Created",
        data: usertable
    });
};

async function userProfileUpdate(req, res) {
    var token = req.headers.authorization;
    var data = req.body;
    var decoded = jwt.verify(token, 'key');
    var updateUser = await UserModel.updateOne({ _id: decoded._id }, {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password
    }, { upsert: true });
    console.log(updateUser, "profile update............................");
    res.json({
        status: true,
        message: "User Updated",
        data: updateUser
    });
};

async function userRemove(req, res) {
    var removeUser = await UserModel.deleteOne({
        _id: req.query.id
    });
    console.log(req.query.id, "user remove id............");
    res.json({
        status: true,
        message: "User Removed",
        data: removeUser,
    });
}


module.exports = {
    userRegister,
    userProfileget,
    userProfile,
    userTable,
    userlogin,
    userProfileUpdate,
    userRemove
}