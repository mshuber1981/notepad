import React from "react";
// https://react-bootstrap.github.io/components/cards/
import { Card } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <section className="home container-fluid">
      <NavBar />
      <article className="d-flex flex-column vh-100 align-items-center justify-content-center text-center">
        <Card bg="light" text="dark" border="primary">
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
