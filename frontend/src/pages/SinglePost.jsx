import { useEffect, useState } from "react";
import { API_URL, useBlogs } from "../context/BlogContext";
import Popup from "../utilities/Popup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Container, Button, Row, Col, Card } from "react-bootstrap";
import { titleCaptialize, formatDate } from "../utilities/helpers";
import { IoMdArrowBack } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const SinglePost = () => {
  const [postInfo, setPostInfo] = useState([]);
  const { userInfo, popup, handlePostDelete } = useBlogs();

  const { id } = useParams();
  const postId = id;

  const navigate = useNavigate();

  useEffect(() => {
    const getPostById = async () => {
      try {
        fetch(API_URL + `/post/${postId}`).then((response) => {
          response.json().then((posts) => {
            // console.log("Data:", posts);
            setPostInfo(posts);
          });
        });
      } catch (error) {
        console.error("Error fetching post by ID:", error);
      }
    };
    getPostById();
  }, [postId]);

  const { title, category, description, author, createdAt, updatedAt } =
    postInfo;
  // console.log("usefinfo from conetxt", userInfo);

  return (
    <div>
      <div className="py-3" style={{ minHeight: "84vh" }}>
        <section>
          <Breadcrumb>
            <Breadcrumb.Item active>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Blogs</Breadcrumb.Item>
          </Breadcrumb>
        </section>

        {postInfo && (
          <Container className="pb-3">
            <Row xs={1} md={2}>
              <Col xs={12} md={8} className="py-1 px-1">
                <section className="px-3 py-3 pe-4 border border-2 rounded-2">
                  <div>
                    <h1>{title}</h1>
                    <span className="text-secondary">{category}</span>
                    <hr />
                    <p>{description}</p>
                  </div>

                  {userInfo?.id === postInfo?.author?._id ? (
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        className="d-flex gap-1 align-items-center"
                        onClick={() => navigate(`/edit/${postId}`)}
                      >
                        <FiEdit size={20} />
                        Edit this Post
                      </Button>

                      <Button
                        variant="danger"
                        className="d-flex gap-1 align-items-center"
                        onClick={() => handlePostDelete(postId)}
                      >
                        <MdDeleteForever size={20} />
                        Delete this Post
                      </Button>
                    </div>
                  ) : (
                    <div>{/* no data here */}</div>
                  )}
                </section>
              </Col>

              <Col
                xs={12}
                md={4}
                className="py-1 px-1"
                style={{ fontSize: "14px" }}
              >
                <Card className="p-3">
                  <Card.Title className="text-black text-center">
                    <h3>Author</h3>
                  </Card.Title>

                  <Row className="mb-2">
                    <Col sm={4} className="fw-bold text-secondary">
                      Name:
                    </Col>
                    <Col sm={8} className="text-primary fw-bold">
                      {titleCaptialize(author?.username)}
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm={4} className="fw-bold text-secondary">
                      Post created:
                    </Col>
                    <Col sm={8}>{createdAt && formatDate(createdAt)}</Col>
                  </Row>

                  <Row>
                    <Col sm={4} className="fw-bold text-secondary">
                      Post updated:
                    </Col>
                    <Col sm={8}>{updatedAt && formatDate(updatedAt)}</Col>
                  </Row>
                </Card>

                {/* <div className="px-4 py-1  border border-2 rounded-2">
                  <h2 className="text-black">Author</h2>

                  <Stack direction="horizontal" gap={1}>
                    <span className="fw-bold text-secondary">Name:</span>
                    <span className="fw-bold fs-6">
                      {titleCaptialize(author?.username)}
                    </span>
                  </Stack>

                  <Stack direction="horizontal" className="pt-1" gap={1}>
                    <span className="fw-bold text-secondary">
                      Post created:
                    </span>
                    {createdAt && (
                      <span className="fs-6">{formatDate(createdAt)}</span>
                    )}
                  </Stack>

                  <Stack direction="horizontal" className="pt-1" gap={1}>
                    <span className="fw-bold text-secondary">
                      Post updated:
                    </span>
                    {updatedAt && (
                      <span className="fs-6">{formatDate(updatedAt)}</span>
                    )}
                  </Stack>
                </div> */}
              </Col>
            </Row>
          </Container>
        )}

        <Button
          variant="secondary"
          className="mx-1 mt-5 py-2 px-2 d-flex gap-1 align-items-center"
          onClick={() => navigate("/")}
        >
          <IoMdArrowBack size={20} />
          Back to Home
        </Button>

        {popup && <Popup text="Post Deleted" color="red" />}
      </div>
    </div>
  );
};

export default SinglePost;
