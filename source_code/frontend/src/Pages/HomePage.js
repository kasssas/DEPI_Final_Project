import UserModal from '../Components/UserModal/UserModal'
import ProjectModal from '../Components/ProjectModal/ProjectModal'
import ProjectCardContainer from '../Components/ProjectCardContainer/ProjectCardContainer'
import UserCardContainer from '../Components/UserCardContainer/UserCardContainer'

const HomePage = () => {
  return (
    <div className="container">
      <div className="add-section d-flex mt-4">
        <UserModal />
        <ProjectModal />
      </div>
      <div className="projects-section mt-4">
        <ProjectCardContainer />
      </div>
      <div className="users-section mt-4">
        <UserCardContainer />
      </div>
    </div>
  )
}

export default HomePage