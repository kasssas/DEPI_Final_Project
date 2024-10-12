import './UserCardContainer.css'
import UserCard from '../UserCard/UserCard'
import UserCardPlaceholder from '../UserCardPlaceholder/UserCardPlaceholder'
import UserCardContainerHook from '../../Hooks/UserCardContainerHook'
import AlertCard from '../AlertCard/AlertCard'

const UserCardContainer = () => {
  const [error, loading, data, clearAllUsersIconClickHandle] = UserCardContainerHook()
  return (
    <div className="user-card-container">
      <div className="user-card-container__header d-flex  align-items-center">
        <h1 className="user-card-container__title me-3">Users</h1>
        <span className={`user-card-container__clear-icon ${data?.getAllUsers?.length ? '' : 'd-none'}`} onClick={clearAllUsersIconClickHandle}>
          <i className="fa-solid fa-trash" title='Clear'></i>
        </span>
      </div>
      <div className="row gap-2 p-2">
        {
          error ? (
            <AlertCard variant='danger'>Something went wrong</AlertCard>
          ) : loading ? (
            <>
            <UserCardPlaceholder />
            <UserCardPlaceholder />
            <UserCardPlaceholder />
            </>
          ) : (
            data?.getAllUsers?.length ? (
              data.getAllUsers?.map((user) => {
                return <UserCard key={user.id} user={user} />
              })
            ) : (
              <AlertCard variant='warning'>No Users Data</AlertCard>
            )
          )
        }
      </div>
    </div>
  )
}

export default UserCardContainer