const UserModel = require("../models/userModel");

// login get start....................
function loginget(req, res) {
    console.log(req.session.user, "userdashboard.........");
    if (req.session?.user) {
        res.redirect("/dashboard");
    } else {
        res.render("pages/loginScreen/login", { layout: "layout/authLayout/authLayer" });
    };
};
// login get end....................

// login post start....................
async function loginpost(req, res) {
    console.log(req.body);
    let data = req.body;

    var user = await UserModel.findOne({
        email: data.email,
        password: data.password,
    });
    console.log(user, "userlist....................");
    req.session.user = user;
    console.log(req.session.user, "user session ..........................");

    if (user == null) {
        res.redirect("/login");
    } else {
        res.redirect("/dashboard");
    }
};
// login post end....................

// register get start ........................
function registerget(req, res) {
    res.render("pages/loginScreen/register", { layout: "layout/authLayout/authLayer" });
};
// register get end .......................

// register get start ........................
async function registerpost(req, res) {
    var data = req.body;
    console.log(data);
    var pass = data.password;
    var repeatepass = data.repeatPassword;
    if (pass == repeatepass) {
        var user = await UserModel.create({
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            password: data.password
        });
        res.redirect("/login");
    } else {
        var user = await UserModel.create({
            firstName: data.firstname = null,
            lastName: data.lastname = null,
            email: data.email = null,
            password: data.password = null
        });
        res.redirect("/register")
    }
};
// register get end .......................

// logout start......................
async function logOut(req, res) {
    req.session.user = null;
    console.log(req.session.user, "logout Successfully..................");
    res.redirect("/login");
}
// logout end......................

module.exports = {
    loginget,
    loginpost,
    registerget,
    registerpost,
    logOut
}