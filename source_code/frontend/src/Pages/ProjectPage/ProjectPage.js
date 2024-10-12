import './ProjectPage.css'
import { Link } from 'react-router-dom'
import UserCard from '../../Components/UserCard/UserCard'
import UserCardPlaceholder from '../../Components/UserCardPlaceholder/UserCardPlaceholder'
import ProjectPagePlaceholder from '../../Components/ProjectPagePlaceholder/ProjectPagePlaceholder'
import ProjectPageHook from '../../Hooks/ProjectPageHook'
import AlertCard from '../../Components/AlertCard/AlertCard'
import scrollToTop from '../../Utils/scrollToTop'

const ProjectPage = () => {
  const [error, getProjectLoading, data, projectNameValue, descriptionValue, statusValue, projectNameInputOnChangeHandle, descriptionInputOnChangeHandle, statusInputOnChangeHandle, updateProjectOnClickHandle, updateProjectLoading, deleteProjectOnClickHandle, deleteProjectLoading] = ProjectPageHook()
  
  return (
    <div className="project-page container card p-5 mt-4">
      {/* back icon */}
      <span className="project-page__back-icon">
        <Link to="/" onClick={()=> scrollToTop()}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
      </span>
      {/* project details */}
      <div className="project-page__project-info mt-3">
        {error ? (
          <AlertCard variant="danger">Something went wrong</AlertCard>
        ) : getProjectLoading ? (
          <ProjectPagePlaceholder />
        ) : (
          data?.getOneProject && (
            <>
              <h1 className="project-page__title">
                {data?.getOneProject.name}
              </h1>
              <p className="project-page__description">
                {data?.getOneProject.description}
              </p>
              <h3 className="project-page__status text-secondary mt-4">
                Project Status
              </h3>
              <p className="project-page__status-text">
                {data?.getOneProject.status}
              </p>
            </>
          )
        )}
      </div>
      {/* user information */}
      <div className="project-page__user-info">
        <h2 className="project-page__user-information">User Information</h2>
        {error ? (
          <AlertCard variant="danger">Something went wrong</AlertCard>
        ) : getProjectLoading ? (
          <UserCardPlaceholder />
        ) : (
          data?.getOneProject && (
            <UserCard user={data?.getOneProject.user} hideDeleteIcon={true} />
          )
        )}
      </div>
      {/* update project details */}
      <div className="project-page__update-info">
        <h2 className="project-page__update-header">Update Project Details</h2>
        <div className="project-page__update-form">
          <input type="text" className="form-control" value={projectNameValue} onChange={projectNameInputOnChangeHandle} />
          <textarea
            className="form-control"
            rows="3"
            value={descriptionValue}
            onChange={descriptionInputOnChangeHandle}
          ></textarea>
          <select className="form-select" value={statusValue} onChange={statusInputOnChangeHandle}>
            <option value="Loading..." className={`${!getProjectLoading && "d-none"}`}>Loading...</option>
            <option value="NotStarted">Not Started</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="project-page__update-btn d-inline">
            <button type="submit" className="btn btn-success" onClick={updateProjectOnClickHandle} 
              disabled={updateProjectLoading || (projectNameValue === data?.getOneProject.name && descriptionValue === data?.getOneProject.description && statusValue === data?.getOneProject.status)}>
              Update
            </button>
            <i className={`fa-solid fa-spinner fa-spin ${updateProjectLoading ? "" : "d-none"}`}></i>
          </div>
        </div>
        <div className="project-page__delete-btn my-4 d-flex justify-content-end">
          <button type="submit" className="btn btn-danger" onClick={deleteProjectOnClickHandle} >
            Delete Project
          </button>
          <i className={`fa-solid fa-spinner fa-spin ${deleteProjectLoading ? "" : "d-none"}`}></i>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage