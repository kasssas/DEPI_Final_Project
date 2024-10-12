const userModel = require("../../models/userModel")

exports.userQueries = {
  // get all users
  getAllUsers: async () => {
    try {
      const documents = await userModel.find()
      return documents
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to get all users")
    }
  },
  // get one user
  getOneUser: async ({id}) => {
    try {
      const document = await userModel.findById(id)
      .populate("projects")
      return document
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to get user")
    }
  }
}