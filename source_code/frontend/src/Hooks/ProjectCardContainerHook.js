import { useMutation, useQuery } from "@apollo/client";

import { DELETE_ALL_PROJECTS } from "../GraphQl/Mutations/projectMutation";
import swalToast from "../Utils/swalToast";
import swalDeleteAllDataConfirmation from "../Utils/swalDeleteAllDataConfirmation";
import { GET_ALL_PROJECTS } from "../GraphQl/Queries/projectQuery";

const ProjectCardContainerHook = () => {
  // get all projects query
  const { data, error, loading } = useQuery(GET_ALL_PROJECTS, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log({ err });
    },
  });

  // delete all projects mutation
  const [deleteAllProjects] = useMutation(DELETE_ALL_PROJECTS, {
    onCompleted: () => {
      swalToast("success", "all projects deleted successfully");
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
        },
      });
      cache.gc();
    },
  });

  // clear all projects handler
  const clearAllProjectsOnClickHandle = () => {
    if (!data.getAllProjects.length) return;
    swalDeleteAllDataConfirmation(deleteAllProjects);
  };

  return [error, loading, data, clearAllProjectsOnClickHandle];
};

export default ProjectCardContainerHook;
