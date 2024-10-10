import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL, useBlogs } from "../context/BlogContext";
import Container from "react-bootstrap/Container";
import { Navbar as Navs } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Popup from "../utilities/Popup";

const Navbar = () => {
  const [popBox, setPopBox] = useState(false);

  const { userInfo, setUserInfo } = useBlogs();
  const username = userInfo?.username;

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked!");

    fetch(API_URL + "/logout", {
      credentials: "include",
      method: "POST",
    });

    setUserInfo(null);
    setPopBox(!popBox);

    setTimeout(() => {
      setPopBox(false);
      navigate("/");
    }, 500);
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isActive ? "#8a8a8a" : "white",
      textDecoration: isActive ? "underline" : "none",
    };
  };

  return (
    <>
      <div className="mb-1" style={{ fontSize: "20px" }}>
        <Navs bg="dark" expand="lg" data-bs-theme="dark">
          <Container>
            <NavLink to="/" className="text-white">
              <h3 style={{ fontWeight: "bold" }}>Blogify</h3>
            </NavLink>
            <Navs.Toggle aria-controls="basic-Navs-nav" />
            <Navs.Collapse id="basic-Navs-nav">
              <Nav className="ms-auto">
                {username ? (
                  <>
                    <Nav.Link as="li">
                      <NavLink to="/newpost" className="text-white">
                        Create Post
                      </NavLink>
                    </Nav.Link>

                    <Nav.Link as="li">
                      <NavLink
                        onClick={handleLogout}
                        className="text-white text-decoration-none"
                      >
                        <span>
                          Logout
                          <span
                            className="p-1 text-secondary-emphasis"
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {username && `(${username})`}
                          </span>
                        </span>
                      </NavLink>
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as="li">
                      <NavLink to="/login" style={navLinkStyles}>
                        Login
                      </NavLink>
                    </Nav.Link>

                    <Nav.Link as="li">
                      <NavLink to="/register" style={navLinkStyles}>
                        Register
                      </NavLink>
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navs.Collapse>
          </Container>
        </Navs>
      </div>

      {popBox && <Popup text="Logout success" color="red" />}
    </>
  );
};

export default Navbar;
