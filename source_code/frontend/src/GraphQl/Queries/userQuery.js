import { gql } from "@apollo/client";

// Get all users 
export const GET_ALL_USERS = gql`
  query allUsers {
    getAllUsers {
      id
      name
      email
      phone
    }
  }
`;

// Get one user by ID. 
export const GET_ONE_USER = gql`
  query oneUser ( $id:ID! ) {
    getOneUser(id: $id) {
      id
      name
      email
      phone
      projects {
        id
        name
        status
      }
    }
  }
`;


