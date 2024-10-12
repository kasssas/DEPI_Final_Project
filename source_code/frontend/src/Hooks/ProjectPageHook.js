import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ONE_PROJECT } from "../GraphQl/Queries/projectQuery";
import { useState } from "react";
import {
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "../GraphQl/Mutations/projectMutation";
import swalToast from "../Utils/swalToast";

const ProjectPageHook = () => {
  // get project id
  const { projectId } = useParams();

  // define navigate
  const navigateTo = useNavigate();

  // define update project states
  const [projectNameValue, setProjectNameValue] = useState("Loading...");
  const [descriptionValue, setDescriptionValue] = useState("Loading...");
  const [statusValue, setStatusValue] = useState("Loading...");

  // project query
  const {
    error,
    loading: getProjectLoading,
    data,
  } = useQuery(GET_ONE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      setProjectNameValue(data.getOneProject.name);
      setDescriptionValue(data.getOneProject.description);
      setStatusValue(data.getOneProject.status);
    },
  });

  // update project mutation
  const [updateProject, { loading: updateProjectLoading }] = useMutation(
    UPDATE_PROJECT,
    {
      variables: {
        id: projectId,
        name: projectNameValue,
        description: descriptionValue,
        status: statusValue,
      },
      onCompleted: () => {
        swalToast("success", "project updated successfully");
        window.scrollTo({
          top: 0,
        });
      },
      onError: () => {
        swalToast("error", "something went wrong");
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_ONE_PROJECT,
          data: {
            getOneProject: data.updateProject,
          },
        });
      },
    }
  );

  // delete project mutation
  const [deleteProject, { loading: deleteProjectLoading }] = useMutation(
    DELETE_PROJECT,
    {
      variables: { id: projectId },
      onCompleted: () => {
        swalToast("success", "project deleted successfully");
        navigateTo("/");
        window.scrollTo({
          top: 0,
        });
      },
      onError: () => {
        swalToast("error", "something went wrong");
      },

      update: (cache) => {
        cache.evict({ id: `Project:${projectId}` });
        cache.gc();
      },
    }
  );

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

  // update project handler
  const updateProjectOnClickHandle = () => {
    updateProject(projectId, projectNameValue, descriptionValue, statusValue);
  };

  // delete project handler
  const deleteProjectOnClickHandle = () => {
    deleteProject(projectId);
  };

  return [
    error,
    getProjectLoading,
    data,
    projectNameValue,
    descriptionValue,
    statusValue,
    projectNameInputOnChangeHandle,
    descriptionInputOnChangeHandle,
    statusInputOnChangeHandle,
    updateProjectOnClickHandle,
    updateProjectLoading,
    deleteProjectOnClickHandle,
    deleteProjectLoading,
  ];
};

export default ProjectPageHook;
