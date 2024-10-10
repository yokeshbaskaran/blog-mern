import { useEffect, useState } from "react";
import { Form, Button, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, useBlogs } from "../context/BlogContext";
import Popup from "../utilities/Popup";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [popBox, setPopBox] = useState(false);
  const { dataChanged, setDataChanged } = useBlogs();

  const navigate = useNavigate();

  const { id } = useParams();
  const postId = id;

  useEffect(() => {
    fetchPostsById();
  }, [dataChanged]);

  const fetchPostsById = async () => {
    const response = await axios.get(API_URL + `/post/${postId}`, {
      withCredentials: true,
    });
    const data = await response.data;
    setTitle(data.title);
    setCategory(data.category);
    setDescription(data.description);
  };

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      if (title === "" || category === "" || description === "") {
        alert("Enter details!");
        return null;
      }

      if (title !== "" && category !== "" && description !== "") {
        {
          const updatedPostDetails = {
            title: title,
            category: category,
            description: description,
          };

          const response = await axios.put(
            API_URL + `/post/${postId}`,
            updatedPostDetails
          );

          //console.log("link", API_URL + postId, updatedPostDetails);

          if (!response) {
            console.log("Post not created");
          }

          setTimeout(() => {
            setDataChanged(!dataChanged);
            navigate("/");
            setTitle("");
            setCategory("");
            setDescription("");
            setPopBox(!popBox);
          }, 1000);

          setPopBox(!popBox);
        }
      } else {
        alert("Enter details properly!");
      }
    } catch (error) {
      console.log("Error sending data!" + error.message);
    }
  };

  return (
    <div className="py-3">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item active>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <Link to={`/posts/${id}`}>BlogPost</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <h2>Edit Post</h2>
      <Form
        className="my-3 p-3 border border-2 rounded-4"
        onSubmit={updatePost}
      >
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>
            <h4> Title:</h4>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>
            <h4>Category</h4>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <h4> Description:</h4>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex">
          <Button className="my-2 py-2 px-3" variant="success" type="submit">
            Update Post
          </Button>

          <Button
            className="my-2 mx-3 py-2 px-3"
            variant="secondary"
            type="submit"
            onClick={() => navigate(`/posts/${postId}`)}
          >
            Cancel
          </Button>
        </div>
      </Form>

      {popBox && <Popup text="Post Updated" color="green" />}
    </div>
  );
};

export default EditPost;
