import "./ProjectCardContainer.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectCardPlaceholder from "../ProjectCardPlaceholder/ProjectCardPlaceholder";
import ProjectCardContainerHook from "../../Hooks/ProjectCardContainerHook";
import AlertCard from "../AlertCard/AlertCard";
import detectErrors from "../../Utils/detectErrors";

const ProjectCardContainer = () => {
  const [error, loading, data, clearAllProjectsOnClickHandle] = ProjectCardContainerHook();
  return (
    <div className="project-card-container">
      <div className="project-card-container__header d-flex  align-items-center">
        <h1 className="project-card-container__title me-3">Projects</h1>
        <span
          className={`project-card-container__clear-icon ${
            data?.getAllProjects?.length ? "" : "d-none"
          }`}
          onClick={clearAllProjectsOnClickHandle}
        >
          <i className="fa-solid fa-trash" title="Clear"></i>
        </span>
      </div>
      <div className="row gap-2 p-2">
        {error ? (
          <AlertCard variant="danger">{detectErrors(error)}</AlertCard>
        ) : loading ? (
          <>
            <ProjectCardPlaceholder />
            <ProjectCardPlaceholder />
            <ProjectCardPlaceholder />
            <ProjectCardPlaceholder />
          </>
        ) : data?.getAllProjects?.length ? (
          data.getAllProjects?.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })
        ) : (
          <AlertCard variant="warning">No Projects Data</AlertCard>
        )}
      </div>
    </div>
  );
};

export default ProjectCardContainer;
