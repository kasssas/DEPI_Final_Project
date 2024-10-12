import './UserCardPlaceholder.css'

const UserCardPlaceholder = () => {
  return (
    <div className="user-card__placeholder card p-0 col-lg-3 shadow">
      <div className="card-body">
        <h5 className="card-title user-card__placeholder-title mb-3"> </h5>
        <div className="user-card__placeholder-email d-flex align-items-center">
          <span className="user-card__placeholder-email-icon"></span>
          <p className="card-text user-card__placeholder-email-content ms-2"> </p>
        </div>
        <div className="user-card__placeholder-phone d-flex align-items-center mt-2">
          <span className="user-card__placeholder-phone-icon"></span>
          <p className="card-text user-card__placeholder-phone-content ms-2"></p>
        </div>
      <span className="user-card__placeholder-view-btn mt-4"> </span>
      </div>
    </div>
  )
}

export default UserCardPlaceholder