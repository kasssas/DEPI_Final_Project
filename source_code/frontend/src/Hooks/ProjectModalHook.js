import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_PROJECT } from "../GraphQl/Mutations/projectMutation";
import swalToast from "../Utils/swalToast";

import { GET_ALL_USERS } from "../GraphQl/Queries/userQuery";
import { GET_ALL_PROJECTS } from "../GraphQl/Queries/projectQuery";

const ProjectModalHook = () => {
  // define states
  const [show, setShow] = useState(false);
  const [projectNameValue, setProjectNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [statusValue, setStatusValue] = useState(undefined);
  const [userValue, setUserValue] = useState("");

  // get all users for user slect form
  const { error, data } = useQuery(GET_ALL_USERS);

  // create project mutation
  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    variables: {
      name: projectNameValue,
      description: descriptionValue,
      status: statusValue,
      user: userValue,
    },
    onCompleted: () => {
      setShow(false);
      setProjectNameValue("");
      setDescriptionValue("");
      setStatusValue("");
      setUserValue("");
      swalToast("success", "project created successfully");
    },
    onError: () => {
      swalToast("error", "something went wrong");
    },
    update: (cache, { data: { createProject } }) => {
      const { getAllProjects } = cache.readQuery({
        query: GET_ALL_PROJECTS,
      });
      cache.writeQuery({
        query: GET_ALL_PROJECTS,
        data: {
          getAllProjects: [...getAllProjects, createProject],
        },
      });
    },
  });

  // modal controls
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // input change handlers
  const projectNameInputOnChangeHandle = (e) => {
    setProjectNameValue(e.target.value);
  };

  const descriptionInputOnChangeHandle = (e) => {
    setDescriptionValue(e.target.value);
  };

  const statusInputOnChangeHandle = (e) => {
    setStatusValue(e.target.value);
  };

  const userInputOnChangeHandle = (e) => {
    setUserValue(e.target.value);
  };

  // add project click handler
  const addProjectOnClickHandle = () => {
    if (!projectNameValue || !descriptionValue || !userValue) {
      swalToast("warning", "some fields are required");
      return;
    }
    createProject(projectNameValue, descriptionValue, statusValue, userValue);
  };

  return [
    show,
    handleClose,
    handleShow,
    projectNameValue,
    descriptionValue,
    projectNameInputOnChangeHandle,
    descriptionInputOnChangeHandle,
    statusInputOnChangeHandle,
    userInputOnChangeHandle,
    addProjectOnClickHandle,
    loading,
    error,
    data,
  ];
};

export default ProjectModalHook;
