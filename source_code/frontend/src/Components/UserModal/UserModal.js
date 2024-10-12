import "./UserModal.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import UserModalHook from "../../Hooks/UserModalHook";
import { TiUserAdd } from "react-icons/ti";

const UserModal = () => {
  const [
    show,
    handleClose,
    handleShow,
    nameValue,
    emailValue,
    phoneValue,
    addUserOnClickHandle,
    nameInputOnChangeHandle,
    emailInputOnChangeHandle,
    phoneInputOnChangeHandle,
    loading
  ] = UserModalHook();
  return (
    <div className="user-modal">
      <Button variant="" className="user-modal__btn d-flex justify-content-center align-items-center" onClick={handleShow}>
        <TiUserAdd className="user-modal__btn-icon" />
        <span className="user-modal__btn-text">Add User</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="user-modal__title">New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="name"
                value={nameValue}
                onChange={nameInputOnChangeHandle}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="email"
                value={emailValue}
                onChange={emailInputOnChangeHandle}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="phone"
                value={phoneValue}
                onChange={phoneInputOnChangeHandle}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="user-modal__save-btn" onClick={addUserOnClickHandle}>
            Add User
            <i className={
              `fa-solid fa-spinner fa-spin
             ${loading ?
               "" : "d-none"}`}></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserModal;
