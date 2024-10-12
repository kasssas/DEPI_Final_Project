import { gql } from "@apollo/client";

// GET ALL PROJECTS Data
const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      id
      name
      status
    }
  }
`;

// GET PROJECT Data By ID
const GET_ONE_PROJECT = gql`
  query GetOneProject($projectId: ID!) {
    getOneProject(id: $projectId) {
      id
      name
      status
      description
      user {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_ALL_PROJECTS, GET_ONE_PROJECT };
