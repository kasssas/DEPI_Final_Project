const projectModel = require("../../models/projectModel")


exports.projectQueries = {
  // get all projects
  getAllProjects: async () => {
    try {
      const documents = await projectModel.find()
      return documents
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to get all projects")
    }
  },
  // get one project
  getOneProject: async ({ id }) => {
    try {
      const document = await projectModel.findById(id)
      .populate("user")
      return document
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to get project")
    }
  }
}