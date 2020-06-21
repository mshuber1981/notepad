import React from "react";
import NavBar from "../components/NavBar";
import Card from "react-bootstrap/Card";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <section className="home">
      <NavBar />
      <article className="d-flex flex-column vh-100 align-items-center justify-content-center text-center">
        <Card
          bg="light"
          text="dark"
          border="primary"
          style={{ width: "25rem", height: "20rem" }}
        >
          <Card.Header as="h1">Welcome!</Card.Header>
          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            <Card.Text className="text-left">
              Thanks for checking out my CRUDdy Notepad app, built with React
              and powered by AWS Amplify. To see more about me please visit my
              portfolio site.
            </Card.Text>
            <Card.Link
              href="https://www.mikeyneedsajob.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              mikeyneedsajob.com
            </Card.Link>
          </Card.Body>
        </Card>
      </article>
      <Footer />
    </section>
  );
};

export default Home;
