import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ROLES = [
  "admin",
  "webdeveloper",
  "graphicdesigner",
  "appdeveloper",
  "user",
];

// created userSchema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    role: {
      type: String,
      enum: ROLES,
      default: "user",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// hash password before saving user

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//compare password

userSchema.methods.comparePassword = async function (candidte) {
  return await bcrypt.compare(candidate, this.password);
};

// Safe object method

userSchema.methods.toSafeObject = function () {
    return{
   id : this._id,
   name : this.name,
   email : this.email,
   role : this.role,
   isActive : this.isActive,
    };
};

module.exports = mongoose.models("User",userSchema)
module.exports.ROLES = ROLES;