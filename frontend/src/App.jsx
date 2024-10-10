import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { BlogProvider } from "./context/BlogContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Layout from "./components/Layout";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";

const App = () => {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="newpost" element={<CreatePost />} />
            <Route path="posts/:id" element={<SinglePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            {/* <Route path="category" element={<Categories />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
};

export default App;
