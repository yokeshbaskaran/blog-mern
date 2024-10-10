import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  titleCaptialize,
  formatDate,
  trimWords,
} from "../utilities/helpers.js";

const AllPosts = ({ blog }) => {
  const { author, _id, title, category, description, updatedAt } = blog;
  const postId = _id;
  // console.log("post id", postId);
  // console.log(author, _id, title, category, description, updatedAt);

  return (
    <div>
      {blog ? (
        <Card className="my-4">
          <Card.Body>
            <Card.Title className="fs-3">{title}</Card.Title>
            <span className="text-secondary">{category}</span>

            <Card.Text>{trimWords(description)}</Card.Text>

            <Button className="bg-dark border-0">
              <Link className="text-decoration-none" to={`/posts/${postId}`}>
                <span className="text-white">About this Blog</span>
              </Link>
            </Button>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">{titleCaptialize(author?.username)}</span>
            <small className="text-muted">{formatDate(updatedAt)}</small>
          </Card.Footer>
        </Card>
      ) : (
        <p>Page Loading...</p>
      )}
    </div>
  );
};

export default AllPosts;
