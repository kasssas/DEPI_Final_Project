const projectModel = require("../../models/projectModel")


exports.projectMutations = {
  // create project
  createProject: async ({ name, description, status, user }) => {
    try {
      const document = await projectModel.create({
        name,
        description,
        status,
        user
      })
      return document
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to create project")
    }
  },
  // update project
  updateProject: async ({ id, name, description, status }) => {
    try {
      const document = await projectModel.findByIdAndUpdate(
        id,
        {
          name,
          description,
          status
        },
        { new: true }
      ).populate("user")
      
      return document
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to update project")
    }
  },
  // delete project
  deleteProject: async ({ id }) => {
    try {
      const document = await projectModel.findByIdAndDelete(id)
      return document
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to delete project")
    }
  },
  // delete all projects
  deleteAllProjects: async () => {
    try {
      await projectModel.deleteMany()
      return "all projects deleted successfully"
    } catch (error) {
      console.log(`${error.name}`.bgRed, `${error.message}`.red, new Error())
      throw new Error("failed to delete all projects")
    }
  }
}