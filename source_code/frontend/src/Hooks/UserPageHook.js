import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import swalToast from "../Utils/swalToast";
// import { GET_ALL_PROJECTS } from "../GraphQl/Queries/projectQuery";
import swalDeleteUserConfirmation from "../Utils/swalDeleteUserConfirmation";
import { GET_ALL_USERS, GET_ONE_USER } from "../GraphQl/Queries/userQuery";
import {
  DELETE_ONE_USER,
  UPDATE_USER,
} from "../GraphQl/Mutations/userMutation";
import { GET_ALL_PROJECTS } from "../GraphQl/Queries/projectQuery";
import detectErrors from "../Utils/detectErrors";

const UserPageHook = () => {
  // get user id
  const { userId } = useParams();

  // define navigate
  const navigateTo = useNavigate();

  // define states
  const [nameValue, setNameValue] = useState("Loading...");
  const [emailValue, setEmailValue] = useState("Loading...");
  const [phoneValue, setPhoneValue] = useState("Loading...");

  // user query
  const {
    error,
    data,
    loading: getUserLoading,
  } = useQuery(GET_ONE_USER, {
    variables: { id: userId },
    onCompleted: (data) => {
      console.log("Query", data);
      setNameValue(data.getOneUser.name);
      setEmailValue(data.getOneUser.email);
      setPhoneValue(data.getOneUser.phone);
    },

    onError: (error) => {
      console.log({error});
    },
  });

  //Use Lazy Query
  const [
    getUserLazyData,
    { error: userLazyError, loading: userLazyLoading, data: userLazyData },
  ] = useLazyQuery(GET_ONE_USER, {
    variables: { id: userId },
    onCompleted: (data) => {
      console.log("Lazy Query", data);
    },
    onError: (err) => {
      console.log({ err });
    },
  });

  // update user mutation
  const [updateUser, { loading: updateUserLoading }] = useMutation(
    UPDATE_USER,
    {
      variables: {
        id: userId,
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
      },

      onCompleted: (data) => {
        console.log(data);
        swalToast("success", "user updated successfully");
      },
      onError: (error) => {
        console.log({ error });
        const errors = detectErrors(error);
        swalToast("error", errors);
      },
    }
  );

  // delete user mutation
  const [deleteUser, { loading: deleteUserLoading }] = useMutation(
    DELETE_ONE_USER,
    {
      variables: {
        id: userId,
      },
      onCompleted: (data) => {
        console.log(data);
        swalToast("success", "user deleted successfully");

        navigateTo("/");
        window.scrollTo({
          top: 0,
        });
      },
      onError: (error) => {
        console.log(error);
        // const errors = detectErrors(error);
        // swalToast("error", errors);
      },
      update: (cache, { data: { deleteUser: deleteUserData } }) => {
        //  remove the current user from cache with old way
        // const { getAllUsers } = cache.readQuery({ query: GET_ALL_USERS });

        // const newData = getAllUsers.filter(
        //   (user) => user.id !== deleteUserData.id
        // );
        // console.log(deleteUserData.id);

        // cache.writeQuery({
        //   query: GET_ALL_USERS,
        //   // data: { getAllUsers: [...getAllUsers,deleteUserData] },
        //   data: {
        //     getAllUsers: newData,
        //   },
        // });

        //-----remove current user with gc efficent-----
        cache.evict({ id: `User:${userId}` });
        cache.gc();
      },
    }
  );
  // input change handlers
  const nameInputOnChangeHandle = (e) => {
    setNameValue(e.target.value);
  };

  const emailInputOnChangeHandle = (e) => {
    setEmailValue(e.target.value);
  };

  const phoneInputOnChangeHandle = (e) => {
    setPhoneValue(e.target.value);
  };

  // update user click handler
  const updateUserOnClickHandle = () => {
    updateUser();
  };

  // delete user click handler
  const deleteUserOnClickHandle = () => {
    swalDeleteUserConfirmation(deleteUser);
  };

  const refetchLazyUserOnClickHandle = () => {
    getUserLazyData();
  };

  return [
    nameValue,
    emailValue,
    phoneValue,
    nameInputOnChangeHandle,
    emailInputOnChangeHandle,
    phoneInputOnChangeHandle,
    updateUserOnClickHandle,
    deleteUserOnClickHandle,
    refetchLazyUserOnClickHandle,
    data,
    error,
    getUserLoading,
    updateUserLoading,
    deleteUserLoading,
    userLazyData,
  ];
};

export default UserPageHook;
