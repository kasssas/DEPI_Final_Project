import "./ProjectModal.css";
import ProjectModalHook from "../../Hooks/ProjectModalHook";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { RiMenuAddFill } from "react-icons/ri";

const ProjectModal = () => {
  const [
    show,
    handleClose,
    handleShow,
    projectNameValue,
    descriptionValue,
    projectNameInputOnChangeHandle,
    descriptionInputOnChangeHandle,
    statusInputOnChangeHandle,
    userInputOnChangeHandle,
    addProjectOnClickHandle,
    loading,
    error,
    data
  ] = ProjectModalHook();
  return (
    <div className="project-modal ms-2">
        <Button variant="" className="project-modal__btn" onClick={handleShow}>
          <RiMenuAddFill className="project-modal__btn-icon" />
          <span className="project-modal__btn-text">New Project</span>
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="project-modal__title">Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="project name"
                  value={projectNameValue}
                  onChange={projectNameInputOnChangeHandle}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: '100px' }}
                  placeholder="description"
                  value={descriptionValue}
                  onChange={descriptionInputOnChangeHandle}
                />
              </Form.Group>
              <Form.Select
                aria-label="Default select example"
                onChange={statusInputOnChangeHandle}
              >
                <option className="text-secondary">Project Status</option>
                <option value="NotStarted">Not Started</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
              <Form.Select
              className="mt-3"
                aria-label="Default select example"
                onChange={userInputOnChangeHandle}
              >
                <option className="text-secondary" value="">Select User</option>
                {
                  error ? (
                    <option>something went wrong</option>
                  ) : data?.getAllUsers?.length ? (
                    data.getAllUsers?.map((user) => {
                      return <option key={user.id} value={user.id}>{user.name}</option>
                    })
                  ) : (
                    <option>No Users Data</option>
                  )
                }
              </Form.Select>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="project-modal__save-btn" onClick={addProjectOnClickHandle}>
              Add Project
              <i className={`fa-solid fa-spinner fa-spin ${loading ? "" : "d-none"}`}></i>
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default ProjectModal;
