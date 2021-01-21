//
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const { retErr } = require("../utils/index");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      //required: true,
      trim: true,
      unique: true,
    },
    userNameLowerCase: {
      type: String,
      //required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      //required: true,
      trim: true,
    },
    plan: {
      type: mongoose.ObjectId,
      required: false,
      trim: true,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },

    firstName: {
      type: String,
      required: false,
    },
    surName: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

//check if password matches to db password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

UserSchema.methods.saveUser = function (userData, res, userName, secret) {
  const user = this;
  return new Promise((resolve, reject) => {
    user.save((err, user) => {
      if (err) {
        reject(retErr(res, err, 418, "DB_ERROR"));
      }
      const token = jwt.sign({ userName: userName }, secret, {
        expiresIn: 86400,
      });
      const userToReturn = { user: user, token: token };
      userToReturn.user.password = undefined;
      //  return res.status(200).json({success: true, data: userToReturn});
      resolve({ success: true, data: userToReturn });
    });
  });
};

UserSchema.methods.removePlan = function () {
  return new Promise((resolve, reject) => {
    this.plan = null;
    this.save((err, user) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      resolve(user);
    });
  });
};

UserSchema.methods.setPlan = function (planId, res) {
  return new Promise((resolve, reject) => {
    this.plan = mongoose.Types.ObjectId(planId);
    console.log(this.plan);
    this.save((err, user) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      resolve(user);
    });
  });
};

UserSchema.methods.destroy = function (res, planToDelete) {
  return new Promise((resolve, reject) => {
    this.deleteOne({ userName: this.userName }, (err, data) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      resolve({ success: true, data: data });
    });
  });
};

UserSchema.methods.updateData = function (res, data) {
  return new Promise((resolve, reject) => {
    this.firstName = data.firstName ?? this.firstName;
    this.surName = data.surName ?? this.surName;
    this.dateOfBirth = data.dateOfBirth ?? this.dateOfBirth;
    this.save((err, user) => {
      if (err) reject(retErr(res, {}, 418, "DB_ERROR"));
      resolve(user);
    });
  });
};

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema, "Users");
