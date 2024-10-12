import './ProjectCardPlaceholder.css'

const ProjectCardPlaceholder = () => {
  return (
    <div className="project-card__placeholder card p-0 col-lg-5 shadow-sm">
      <div className="card-body">
        <h5 className="card-title project-card__placeholder-title"> </h5>
        <div className="project-card__placeholder-status d-flex align-items-center">
          <span className="project-card__placeholder-status-text text-secondary me-1"> </span>
          <p className="card-text project-card__placeholder-status-content"> </p>
        </div>
        <span className="project-card__placeholder-view-btn mt-4"></span>
      </div>
    </div>
  )
}

export default ProjectCardPlaceholder