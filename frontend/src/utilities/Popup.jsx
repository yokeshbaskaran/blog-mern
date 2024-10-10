import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { VscPassFilled } from "react-icons/vsc";

function Popup({ text, color }) {
  return (
    <div className="popup">
      <ToastContainer
        style={{ maxWidth: "245px", marginTop: "75px", marginRight: "15px" }}
        position="top-end"
      >
        <Toast>
          <Toast.Header className="p-3">
            <strong className="fs-6 pe-1">{text}</strong>
            <VscPassFilled className="me-auto" color={color} size={20} />
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Popup;
