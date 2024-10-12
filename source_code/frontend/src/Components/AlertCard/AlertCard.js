import "./AlertCard.css";
import Alert from 'react-bootstrap/Alert'

const AlertCard = (props) => {
  return (
    <Alert variant={props.variant} className="col-lg-9 text-center">
      <i className="fa-solid fa-triangle-exclamation me-2"></i>
      {props.children}
    </Alert>
  );
};

export default AlertCard;
