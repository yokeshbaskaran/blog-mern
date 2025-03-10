import { useBlogs } from "../context/BlogContext";
import AllPosts from "../components/AllPosts";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const HomePage = () => {
  return (
    <>
      <div>
        <div className="my-2 d-flex justify-content-between align-items-center">
          <h1>Recent Posts</h1>

          {/* <Link to="category" className="my-3 mx-1">
            <Button variant="dark">Category</Button>
          </Link> */}
        </div>
      </div>

      <section>
        <Posts /> {/* Posts defined in below here. */}
      </section>
    </>
  );
};

export default HomePage;

export const Posts = () => {
  const [userSearch, setUserSearch] = useState("");
  const { blogPost } = useBlogs();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search here"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </Form.Group>
      </Form>

      <section>
        {blogPost
          .filter((item) => {
            return userSearch.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(userSearch.toLowerCase()) ||
                  item.author?.username
                    .toLowerCase()
                    .includes(userSearch.toLowerCase()) ||
                  item.description
                    .toLowerCase()
                    .includes(userSearch.toLowerCase()) ||
                  item.category
                    .toLowerCase()
                    .includes(userSearch.toLowerCase());
          })
          .map((blog, idx) => (
            <AllPosts blog={blog} key={idx} />
          ))}
      </section>
    </>
  );
};
