const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

//User controllers
exports.getLogin = (req, res) => {
  // if (req.user) {
  //   return res.redirect("/profile");
  // }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  // if (req.user) {
  //   return res.redirect("/profile");
  // }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    userCompany: req.body.userCompany,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
      //   req.logIn(user, (err) => {
      //     if (err) {
      //       return next(err);
      //     }
          res.redirect("/midpoint");
        // });
      });
    }
  );
}

//Company Controllers

exports.getCompanyLogin = (req, res) => {
  // if (req.user) {
  //   return res.redirect("/profile");
  // }
  res.render("newcompany", {
    title: "New Company",
  });
};

exports.postCompanyLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/newcompany");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/newcompany");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/signup");
    });
  })(req, res, next);
};

exports.companyLogout = (req, res) => {
  req.logout(() => {
    console.log('Company has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getCompanySignup = (req, res) => {
  // if (req.user) {
  //   return res.redirect("/profile");
  // }
  res.render("newcompany", {
    title: "Create Company Account",
  });
};

exports.postCompanySignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    userCompany: req.body.userCompany,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../newcompany");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // req.logIn(user, (err) => {
        //   if (err) {
        //     return next(err);
        //   }
          res.redirect("/midpoint");
        // });
      });
    }
  );
}

exports.getMidpoint = (req, res) => {
  // if (req.user) {
  //   return res.redirect("/profile");
  // }
  res.render("midpoint", {
    title: "Choose 'Create User' or 'Login'",
  });
};









//   exports.getNewCompany = (req, res) => {
//     // if (req.user.company) {
//     //   return res.redirect("/signup");
//     // }
//     res.render("newcompany", {
//       title: "Create New Company",
//     });
//   };

//   exports.postNewCompany = (req, res, next) => {
//   const validationErrors = [];
//   if (!validator.isEmail(req.body.email))
//     validationErrors.push({ msg: "Please enter a valid email address." });
//   if (!validator.isLength(req.body.password, { min: 8 }))
//     validationErrors.push({
//       msg: "Password must be at least 8 characters long",
//     });
//   if (req.body.password !== req.body.companyConfirmPassword)
//     validationErrors.push({ msg: "Passwords do not match" });

//   if (validationErrors.length) {
//     req.flash("errors", validationErrors);
//     return res.redirect("../signup");
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, {
//     gmail_remove_dots: false,
//   });

//   const company = new Company ({
//     companyName: req.body.companyName,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   Company.findOne(
//     { $or: [{ email: req.body.email }, { companyName: req.body.companyName }] },
//     (err, existingCompany) => {
//       if (err) {
//         return next(err);
//       }
//       if (existingCompany) {
//         req.flash("errors", {
//           msg: "Account with that email address or company name already exists.",
//         });
//         return res.redirect("../newcompany");
//       }
//       company.save((err) => {
//         if (err) {
//           return next(err);
//         }
//         req.logIn(company, (err) => {
//           if (err) {
//             return next(err);
//           }
//           res.redirect("../signup");
//         });
//       });
//     }
//   );

// };


// exports.getCompanyLogin = (req, res) => {
//   if (req.companyName) {
//     return res.redirect("/signup");
//   }
//   res.render("companylogin", {
//     title: "Company Login",
//   });
// };

// exports.postCompanyLogin = (req, res, next) => {
//   const validationErrors = [];
//   if (!validator.isEmail(req.body.email))
//     validationErrors.push({ msg: "Please enter a valid email address." });
//   if (validator.isEmpty(req.body.password))
//     validationErrors.push({ msg: "Password cannot be blank." });

//   if (validationErrors.length) {
//     req.flash("errors", validationErrors);
//     return res.redirect("/companylogin");
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, {
//     gmail_remove_dots: false,
//   });

//   passport.authenticate("local", (err, company, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!company) {
//       req.flash("errors", info);
//       return res.redirect("/companylogin");
//     }
//     req.logIn(company, (err) => {
//       if (err) {
//         return next(err);
//       }
//       req.flash("success", { msg: "Success! Your company is logged in." });
//       res.redirect(req.session.returnTo || "/signup");
//     });
//   })(req, res, next);
// };