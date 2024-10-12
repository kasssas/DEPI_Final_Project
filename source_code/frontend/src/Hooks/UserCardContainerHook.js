import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../GraphQl/Queries/userQuery";
import { DELETE_ALL_USERS } from "../GraphQl/Mutations/userMutation";
import swalToast from "../Utils/swalToast";
import swalDeleteAllDataConfirmation from "../Utils/swalDeleteAllDataConfirmation";

const UserCardContainerHook = () => {
  // get all users
  const { error, loading, data } = useQuery(GET_ALL_USERS);

  // delete all users mutation
  const [deleteAllUsers] = useMutation(DELETE_ALL_USERS, {
    onCompleted: () => {
      swalToast("success", "all users deleted successfully");
    },
    onError: () => {
      swalToast("error", "something went wrong");
    },
    update(cache) {
      cache.modify({
        fields: {
          getAllProjects(existingProjects = []) {
            return [];
          },
          getAllUsers(existingUsers = []) {
            return [];
          },
        },
      });
      cache.gc();
    },
  });

  // clear all users handler
  const clearAllUsersIconClickHandle = () => {
    if (!data.getAllUsers.length) return;
    swalDeleteAllDataConfirmation(deleteAllUsers);
  };

  return [error, loading, data, clearAllUsersIconClickHandle];
};

export default UserCardContainerHook;
