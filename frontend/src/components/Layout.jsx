import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <section style={{ minHeight: "80vh" }}>
        <Container>
          <Outlet />
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
