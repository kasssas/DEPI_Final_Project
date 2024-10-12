import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $status: ProjectStatus
    $user: ID!
  ) {
    createProject(
      name: $name
      description: $description
      status: $status
      user: $user
    ) {
      id
      name
      status
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String
    $description: String
    $status: ProjectStatus
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      user {
        id
        name
        email
        phone
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const DELETE_ALL_PROJECTS = gql`
  mutation deleteAllProjects {
    deleteAllProjects
  }
`;
