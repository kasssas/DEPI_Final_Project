const { userQueries } = require("./queries/userQueries");
const { userMutations } = require("./mutations/userMutations");
const { projectQueries } = require("./queries/projectQueries");
const { projectMutations } = require("./mutations/projectMutations");


exports.resolvers = {
  ...userQueries,
  ...userMutations,
  ...projectQueries,
  ...projectMutations
}