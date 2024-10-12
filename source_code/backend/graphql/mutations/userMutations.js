const userModel = require("../../models/userModel")
const projectModel = require("../../models/projectModel")
const colors = require("colors")

exports.userMutations = {
  // create user
  createUser: async ({ name, email, phone }) => {
    try {
      const document = await userModel.create({
        name,
        email,
        phone
      })
      return document
    } catch (error) {
      console.log(
        `${error.name}`.bgRed,
        `${error.message}`.red,
        new Error()
        )
      throw new Error("failed to create user")
    }
  },
  // update user
  updateUser: async ({ id, name, email, phone }) => {
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          phone
        },
        { new: true }).populate("projects")
      return user
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to update user")
    }
  },
  // delete user
  deleteUser: async ({ id }) => {
    try {
      const document = await userModel.findByIdAndDelete(id)
      await projectModel.deleteMany({ user: id })
      return document
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to delete user")
    }
  },
  // delete all users
  deleteAllUsers: async () => {
    try {
      await userModel.deleteMany();
      await projectModel.deleteMany();
      return "all users deleted successfully";
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error());
      throw new Error("failed to delete all users");
    }
  },
}