import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, useBlogs } from "../context/BlogContext";
import { Button } from "react-bootstrap";
import Popup from "../utilities/Popup";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popBox, setPopBox] = useState(false);
  const navigate = useNavigate();

  const { setUserInfo, dataChanged, setDataChanged, getUserDetails } =
    useBlogs();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert("Enter Details! to login");
      return null;
    }

    if (username !== "" || password !== "") {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response) {
        return null;
      }

      if (response.ok) {
        response.json().then((userInfo) => {
          // console.log("Userinfo from  LOGIN", userInfo.id);
          sessionStorage.setItem("jwt", userInfo.id); // Assuming userInfo.token contains JWT

          setUserInfo(userInfo);
          getUserDetails();

          setTimeout(() => {
            setPopBox(!popBox);
            setDataChanged(!dataChanged);
            setUsername("");
            setPassword("");
            navigate("/");
          }, 1000);

          setPopBox(!popBox);
          //const token =
          localStorage.getItem("jwt");
          // console.log("token from localitem", token);
        });
      } else {
        alert("Failed! Wrong Credentials");
      }
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleLogin} className="authpage">
        <div>
          <label htmlFor="user-name">username</label>
          <input
            type="text"
            id="user-name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="pass-word">password</label>
          <input
            type="password"
            id="pass-word"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" variant="dark" className="my-2 py-2 ">
          Login
        </Button>
      </form>

      {popBox && <Popup text="Login Success" color="green" />}
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import { useAuth } from "../context/Auth";
// import { useLocation, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [user, setUser] = useState("");

//   const auth = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   console.log("login loc", location);

//   const redirectPath = location.state?.path || "/";

//   const handleLogin = () => {
//     auth.login(user);
//     // console.log(user);
//     navigate(redirectPath, { replace: true });
//   };

//   return (
//     <>
//       <div>
//         <label htmlFor="">Username:</label>
//         <input
//           type="text"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//       </div>
//     </>
//   );
// };

// export default Login;
