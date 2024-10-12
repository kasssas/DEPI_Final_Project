const { buildSchema } = require("graphql");


exports.typeDefs = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
    phone: String
    projects: [Project]
    createdAt: String
    updatedAt: String
  }

  enum ProjectStatus {
    NotStarted
    InProgress
    Completed
  }

  type Project {
    id: ID
    name: String
    description: String
    status: ProjectStatus
    user: User
    createdAt: String
    updatedAt: String
  }

  type Query {
    # user Queries
    getAllUsers: [User]
    getOneUser(id: ID!): User

    # project Queries
    getAllProjects: [Project]
    getOneProject(id: ID!): Project
  }

  type Mutation {
    # user Mutations
    createUser(name: String!, email: String!, phone: String!): User
    updateUser(id: ID!, name: String, email: String, phone: String): User
    deleteUser(id: ID!): User
    deleteAllUsers: String

    # project Mutations
    createProject(name: String!, description: String!, status: ProjectStatus, user: ID!): Project
    updateProject(id: ID!, name: String, description: String, status: ProjectStatus): Project
    deleteProject(id: ID!): Project
    deleteAllProjects: String
  }
`)
