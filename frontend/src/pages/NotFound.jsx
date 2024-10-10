import { useNavigate } from "react-router-dom";
import Popup from "../utilities/Popup";
import { Button } from "react-bootstrap";

const NotFound = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 1000);

  return (
    <div>
      <div
        className="w-100 d-flex flex-column justify-content-center align-items-center"
        style={{ height: "82vh" }}
      >
        <p>404 | Page not found!</p>
        <Button variant="dark" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>

      <Popup text="Page not Found!" color="red" />
    </div>
  );
};

export default NotFound;
