import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const BlogContext = createContext();

export const useBlogs = () => {
  return useContext(BlogContext);
};

export const API_URL = import.meta.env.VITE_SERVER_APP_URL;

export const BlogProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({}); //JWT info
  const [blogPost, setBlogPost] = useState([]); //all posts
  const [dataChanged, setDataChanged] = useState(false); //check if data changes in any HTTP methods
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const myCookie = Cookies.get("token");

    if (myCookie) {
      getUserDetails();
      getPosts();
    }
  }, [dataChanged]);

  const getPosts = async () => {
    try {
      const response = await fetch(API_URL + "/post");
      if (!response.ok) {
        console.log(`Error: ${response.status}`);
      }
      const posts = await response.json();
      // console.log("posts", posts);
      setBlogPost(posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const getUserDetails = async () => {
    await fetch(API_URL + "/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        // console.log("user info", userInfo);
      });
    });
  };

  const handlePostDelete = async (postId) => {
    if (window.confirm("Are You sure want to delete?")) {
      try {
        const response = await axios.delete(API_URL + `/post/${postId}`, {
          withCredentials: true,
        });
        // console.log("link", API_URL + postId);
        if (response) {
          setPopup(true);
          setTimeout(() => {
            setPopup(false);
            navigate("/");
            setDataChanged(!dataChanged);
          }, 1000);
          //console.log("posts", posts);

          const updatedPosts = blogPost.filter((item) => item._id !== postId);
          //console.log(`updated posts`, updatedPosts);
          setBlogPost(updatedPosts);
        } else {
          console.log("Post not deleted!");
        }
      } catch (error) {
        console.log("Error Deleting Post!" + error.message);
      }
    }
  };

  const contextValues = {
    popup,
    setPopup,

    dataChanged,
    setDataChanged,

    getUserDetails,

    blogPost,
    setBlogPost,
    getPosts,

    userInfo,
    setUserInfo,

    handlePostDelete,
  };

  return (
    <>
      <BlogContext.Provider value={contextValues}>
        {children}
      </BlogContext.Provider>
    </>
  );
};
