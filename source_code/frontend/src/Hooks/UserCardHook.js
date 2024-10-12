import { useMutation } from "@apollo/client";

import swalToast from "../Utils/swalToast";
import swalDeleteUserConfirmation from "../Utils/swalDeleteUserConfirmation";
import { DELETE_ONE_USER } from "../GraphQl/Mutations/userMutation";

const UserCardHook = (userId) => {
  // delete user mutation
  const [deleteUser] = useMutation(DELETE_ONE_USER, {
    variables: {
      id: userId,
    },
    onCompleted() {
      swalToast("success", "user deleted successfully");
    },
    onError() {
      swalToast("error", "something went wrong");
    },
    update(cache) {
      cache.evict({ id: `User:${userId}` });
      cache.gc();
    },
    refetchQueries: ["getAllProjects"],
  });

  // delete user handler
  const deleteIconOnClickHandle = () => {
    swalDeleteUserConfirmation(deleteUser, userId);
  };

  return [deleteIconOnClickHandle];
};

export default UserCardHook;
