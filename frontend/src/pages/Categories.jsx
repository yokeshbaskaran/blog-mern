import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../../public/cat.css";
import { useBlogs } from "../context/BlogContext";
import { titleCaptialize, trimWords } from "../utilities/helpers";
import { Link } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [smallPost, setSmallPost] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredItems, setFilteredItems] = useState(smallPost);

  const { blogPost, dataChanged } = useBlogs();

  const getCategory = () => {
    const arr = [];
    blogPost.forEach((item) => {
      const element = item.category.trim().toLowerCase();

      if (!arr.includes(element)) {
        arr.push(element);
      }
    });
    setCategory(arr);
    setSmallPost(blogPost);
  };

  const handleCategory = (item) => {
    if (selectedCategory.includes(item)) {
      const filter = selectedCategory.filter((el) => el !== item);
      setSelectedCategory(filter);
    } else {
      setSelectedCategory([...selectedCategory, item]);
    }
    console.log("categories", selectedCategory);
  };

  useEffect(() => {
    getCategory();
    filterPosts();
  }, [dataChanged, selectedCategory]);

  const filterPosts = () => {
    if (selectedCategory.length > 0) {
      let tempItems = selectedCategory.map((selectCategory) => {
        let temp = smallPost.filter((el) => el.category === selectCategory);
        return temp;
      });
      console.log("temp", tempItems);
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...smallPost]);
    }
  };

  console.log("dta", filteredItems);

  return (
    <div>
      <h2>Categories</h2>

      <div className="p-1">
        {category ? (
          category.sort().map((item, idx) => (
            <Button
              variant="dark"
              className="mx-1"
              key={idx}
              onClick={() => handleCategory(item)}
            >
              {item.toLowerCase()}
            </Button>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Container className="my-3">
        <Row xs={1} lg={3}>
          {filteredItems.map((post, idx) => (
            <Col sm={6} md={3} lg={3} key={idx} className="my-2">
              <Link to={`/posts/${post._id}`} className=" text-decoration-none">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <span className="ps-1">
                        {titleCaptialize(post.author?.username)}
                        <span
                          style={{ fontSize: "14px" }}
                          className="text-secondary"
                        >
                          {" "}
                          (author)
                        </span>
                      </span>
                    </Card.Title>
                    <Card.Text>
                      <span className="text-primary">{post.category}</span>
                    </Card.Text>

                    {/* <Card.Title>{trimWords(post.title, 4)}</Card.Title>
                     */}

                    <Card.Text>{trimWords(post.description, 5)}</Card.Text>

                    {/* <Button variant="secondary" className="p-1 px-2">
                      Click here
                    </Button> */}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Categories;

export function MultiFilters() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const items = [
    {
      name: "Elegant Leather Bag",
      category: "Bags",
    },
    {
      name: "Classic Gold Watch",
      category: "Watches",
    },
    {
      name: "Running Shoes",
      category: "Sports",
    },
    {
      name: "Polarized Aviator Sunglasses",
      category: "Sunglasses",
    },
    {
      name: "Casual Backpack",
      category: "Bags",
    },
    {
      name: "Digital Sports Watch",
      category: "Watches",
    },
    {
      name: "Tennis Racket",
      category: "Sports",
    },
    {
      name: "Round Frame Sunglasses",
      category: "Sunglasses",
    },
  ];

  const [filteredItems, setFilteredItems] = useState(items);

  let filters = ["Bags", "Watches", "Sports", "Sunglasses"];

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = items.filter((item) => item.category === selectedCategory);
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...items]);
    }
  };

  return (
    <div className="cat-container">
      <div className="buttons-container">
        {filters.map((category, idx) => (
          <Button
            variant="dark"
            onClick={() => handleFilterButtonClick(category)}
            className={`button mx-1 my-3 border-0 ${
              selectedFilters?.includes(category) ? "active bg-secondary" : ""
            }`}
            key={`filters-${idx}`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div>
        <h5>Length: {filteredItems.length}</h5>
      </div>

      <div className="items-container">
        {filteredItems.map((item, idx) => (
          <Card
            key={`items-${idx}`}
            className="item my-1 mx-2 p-2 border border-2 w-25 d-inline-block"
          >
            <p>{item.name}</p>
            <p className="category">{item.category}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
