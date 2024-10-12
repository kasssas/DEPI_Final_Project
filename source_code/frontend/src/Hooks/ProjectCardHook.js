import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../GraphQl/Mutations/projectMutation";
import swalToast from "../Utils/swalToast";

const ProjectCardHook = (projectId) => {
  // delete project mutation
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id: projectId,
    },
    onCompleted() {
      swalToast("success", "project deleted successfully");
    },
    onError() {
      swalToast("error", "something went wrong");
    },
    update(cache) {
      cache.evict({ id: `Project:${projectId}` });
      cache.gc();
    },
  });

  // delete project handler
  const deleteIconOnClickHandle = () => {
    deleteProject(projectId);
  };

  return [deleteIconOnClickHandle];
};

export default ProjectCardHook;
