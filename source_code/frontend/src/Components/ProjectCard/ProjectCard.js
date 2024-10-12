import ProjectCardHook from '../../Hooks/ProjectCardHook'
import './ProjectCard.css'
import { Link } from 'react-router-dom'
import scrollToTop from '../../Utils/scrollToTop'

const ProjectCard = (props) => {
  const [deleteIconOnClickHandle] = ProjectCardHook(props.project?.id)
  return (
    <div className="project-card card p-0 col-lg-5 shadow-sm">
      <div className="project-card__delete-icon" onClick={deleteIconOnClickHandle}>
        <i className="fa-solid fa-trash-can"></i>
      </div>
      <div className="card-body">
        <h5 className="card-title project-card__title">{props.project?.name}</h5>
        <div className="project-card__status d-flex align-items-center">
          <span className="project-card__status-text text-secondary me-1">Status:</span>
          <p className="card-text">{props.project?.status}</p>
        </div>
      </div>
      <Link to={`/project/${props.project?.id}`} className="project-card__view-btn btn" onClick={()=> scrollToTop()}>View Project</Link>
    </div>
  )
}

export default ProjectCard