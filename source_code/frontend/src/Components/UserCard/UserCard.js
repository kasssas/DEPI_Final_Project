import UserCardHook from '../../Hooks/UserCardHook'
import './UserCard.css'
import { Link } from 'react-router-dom'
import scrollToTop from '../../Utils/scrollToTop'

const UserCard = (props) => {
  const [deleteIconOnClickHandle] = UserCardHook(props.user?.id)
  return (
    <div className="user-card card p-0 col-lg-3 shadow">
      <div className={`user-card__delete-icon ${props.hideDeleteIcon && 'd-none'}`} onClick={deleteIconOnClickHandle}>
        <i className="fa-solid fa-user-xmark"></i>
      </div>
      <div className="card-body">
        <h5 className="card-title user-card__title mb-3">{props.user?.name}</h5>
        <div className="user-card__email d-flex align-items-center">
          <i className="fa-solid fa-envelope"></i>
          <p className="card-text user-card__email-content">{props.user?.email}</p>
        </div>
        <div className="user-card__phone d-flex align-items-center mt-1">
          <i className="fa-solid fa-mobile-retro"></i>
          <p className="card-text user-card__phone-content ms-1">{props.user?.phone}</p>
        </div>
      </div>
      <Link to={`/user/${props.user?.id}`} className="user-card__view-btn btn" onClick={()=> scrollToTop()}>View User</Link>
    </div>
  )
}

export default UserCard