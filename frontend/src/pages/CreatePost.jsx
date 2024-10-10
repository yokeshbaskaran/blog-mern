import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Popup from "../utilities/Popup";
import { useNavigate } from "react-router-dom";
import { API_URL, useBlogs } from "../context/BlogContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [popBox, setPopBox] = useState(false);

  const { dataChanged, setDataChanged } = useBlogs();

  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      if (title === "" || category === "" || description === "") {
        alert("Enter details");
        return null;
      }

      if (title !== "" && category !== "" && description !== "") {
        {
          const newPost = {
            title: title,
            category: category,
            description: description,
          };
          // console.log("postdata:", newPost);
          const response = await fetch(API_URL + "/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
            credentials: "include",
          });

          if (response) {
            setTimeout(() => {
              setDataChanged(!dataChanged);
              setTitle("");
              setCategory("");
              setDescription("");
              setPopBox(!popBox);
              navigate("/");
            }, 1000);
          } else {
            console.log("Post not created");
          }

          setPopBox(!popBox);
        }
      } else {
        alert("Enter details properly!");
      }
    } catch (error) {
      console.log("Error creattin post data!" + error.message);
    }
  };

  return (
    <div>
      <h2>Create new Blog</h2>
      <Form
        className="my-3 p-3 border border-2 rounded-4"
        onSubmit={handleCreatePost}
      >
        <Form.Group className="mb-3" controlId="title">
          <Form.Label style={{ outline: "none" }}>
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

        <Button className="my-2 py-2 px-3" variant="dark" type="submit">
          Create Post
        </Button>
      </Form>

      {popBox && <Popup text="Post Created Successfully" color="green" />}
    </div>
  );
};

export default CreatePost;
