import { useMutation } from "@apollo/client";
import { useState } from "react";

import swalToast from "../Utils/swalToast";
// import { GET_ALL_USERS } from "../GraphQl/Queries/userQuery";
import { CREATE_USER } from "../GraphQl/Mutations/userMutation";
import { GET_ALL_USERS } from "../GraphQl/Queries/userQuery";
import detectErrors from "../Utils/detectErrors";

const UserModalHook = () => {
  // define states
  const [show, setShow] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  // create user mutation
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    variables: {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
    },
    onCompleted: (data) => {
      console.log(data);
      setShow(false);
      setNameValue("");
      setEmailValue("");
      setPhoneValue("");
      swalToast("success", "user created successfully");
    },
    onError: (error) => {
      console.log({ error });

      const errors = detectErrors(error);
      swalToast("error", errors);

      // swalToast("error", error.graphQLErrors.map(err=> err.message).join(","));
      // swalToast("error", error.graphQLErrors.map(err=> err.message).join(","));
      //                     -- طريقه الايرور المباشره--
      // swalToast("error", error.message);
    },
    //------تعديل على الكاش عشان يسمع مباشره بدون طلب للسيرفر--------
    // ------ destrucutre createUser from data and give new alias name "createdUserData"-------
    update: (cache, { data: { createUser: createdUserData } }) => {
      // console.log(cache);
      const { getAllUsers } = cache.readQuery({ query: GET_ALL_USERS });
      // console.log(getAllUsers);
      cache.writeQuery({
        query: GET_ALL_USERS,
        data: {
          getAllUsers: [...getAllUsers, createdUserData],
        },
      });
      // console.log(createdUserData);
    },
    //--- الطريقه البديله للكاش بنفس النتيجه ولكن هيزود طلب للسيرفر ولكن طريقه الكاش اللى باستخدام الابديت اللى فوق افضل-------
    // refetchQueries: [GET_ALL_USERS],
    // refetchQueries: [{ query: GET_ALL_USERS }],
  });

  // modal controls
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  // add user click handler
  const addUserOnClickHandle = (e) => {
    e.preventDefault();
    if (!nameValue || !emailValue || !phoneValue) {
      swalToast("warning", "all fields are required");
      return;
    }
    //--Run  the mutation with its predefined variables--
    createUser();

    //--Run  the mutation with  variables inside it--
    //   createUser(
    //     {
    //     variables: {
    //       name: nameValue,
    //       email: emailValue,
    //       phone: phoneValue,
    //     },
    //   }
    // );
  };

  return [
    show,
    handleClose,
    handleShow,
    nameValue,
    emailValue,
    phoneValue,
    addUserOnClickHandle,
    nameInputOnChangeHandle,
    emailInputOnChangeHandle,
    phoneInputOnChangeHandle,
    loading,
  ];
};

export default UserModalHook;
