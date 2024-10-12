import { Link } from "react-router-dom";
import "./UserPage.css";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import ProjectCardPlaceholder from "../../Components/ProjectCardPlaceholder/ProjectCardPlaceholder";
import UserPagePlaceHolder from "../../Components/UserPagePlaceHolder/UserPagePlaceHolder";
import UserPageHook from "../../Hooks/UserPageHook";
import AlertCard from "../../Components/AlertCard/AlertCard";
import scrollToTop from "../../Utils/scrollToTop";
import detectErrors from "../../Utils/detectErrors";

const UserPage = () => {
  const [
    nameValue,
    emailValue,
    phoneValue,
    nameInputOnChangeHandle,
    emailInputOnChangeHandle,
    phoneInputOnChangeHandle,
    updateUserOnClickHandle,
    deleteUserOnClickHandle,
    refetchLazyUserOnClickHandle,
    data,
    error,
    getUserLoading,
    updateUserLoading,
    deleteUserLoading,
    userLazyData,
  ] = UserPageHook();
  return (
    <div className="user-page container card p-5 mt-4">
      {/* back icon */}
      <span className="user-page__back-icon">
        <Link to="/" onClick={() => scrollToTop()}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
      </span>
      {/* user details */}
      <div className="user-page__user-info mt-3">
        {error ? (
          <AlertCard variant="danger">{detectErrors(error)}</AlertCard>
        ) : getUserLoading ? (
          <UserPagePlaceHolder />
        ) : (
          data?.getOneUser && (
            <h1 className="user-page__title">{data.getOneUser.name}</h1>
          )
        )}
      </div>
      {/* user projects */}
      <div className="user-page__project-info">
        <h2 className="user-page__project-header">Projects</h2>
        <div className="user-page__projects row gap-2">
          {error ? (
            <AlertCard variant="danger">Something went wrong</AlertCard>
          ) : getUserLoading ? (
            <>
              <ProjectCardPlaceholder />
              <ProjectCardPlaceholder />
              <ProjectCardPlaceholder />
              <ProjectCardPlaceholder />
            </>
          ) : data?.getOneUser?.projects?.length ? (
            data.getOneUser.projects.map((project) => {
              return <ProjectCard key={project.id} project={project} />;
            })
          ) : (
            data?.getOneUser?.projects?.length === 0 && (
              <AlertCard variant="warning">No Projects Data</AlertCard>
            )
          )}
        </div>
      </div>
      {/* update user data */}
      <div className="user-page__update-info">
        <h2 className="user-page__update-header">Update User Data</h2>
        <div className="user-page__update-form">
          <input
            type="text"
            className="form-control"
            value={nameValue}
            onChange={nameInputOnChangeHandle}
          />
          <input
            type="text"
            className="form-control"
            value={emailValue}
            onChange={emailInputOnChangeHandle}
          />
          <input
            type="text"
            className="form-control"
            value={phoneValue}
            onChange={phoneInputOnChangeHandle}
          />
          <div className="user-page__update-btn d-inline">
            <button
              className="btn btn-success"
              onClick={updateUserOnClickHandle}
              disabled={
                updateUserLoading ||
                (nameValue === data?.getOneUser?.name &&
                  emailValue === data?.getOneUser?.email &&
                  phoneValue === data?.getOneUser?.phone)
              }
            >
              Update
            </button>
            <i
              className={`fa-solid fa-spinner fa-spin ${
                updateUserLoading ? "" : "d-none"
              }`}
            ></i>
          </div>
        </div>
        <div className="user-page__delete-btn my-4 d-flex justify-content-end">
          <button className="btn btn-danger" onClick={deleteUserOnClickHandle}>
            Delete User
          </button>
          <i
            className={`fa-solid fa-spinner fa-spin ${
              deleteUserLoading ? "" : "d-none"
            }`}
          ></i>
        </div>
        <div className="user-page__delete-btn my-4 d-flex justify-content-end">
          <button
            className="btn btn-warning"
            onClick={refetchLazyUserOnClickHandle}
          >
            Refetch User LazyQuery
          </button>
        </div>
        <div>
          {userLazyData?.getOneUser && <h1>{userLazyData.getOneUser.email}</h1>}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
