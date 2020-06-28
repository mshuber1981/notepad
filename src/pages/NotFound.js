import React from "react";
// https://react-bootstrap.github.io/components/buttons/
import { Button, Card } from "react-bootstrap";
// https://www.npmjs.com/package/react-router-bootstrap
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="home d-flex flex-column vh-100 justify-content-center align-items-center text-center">
      <Link exact="true" to="/">
        <Button>Home 🗒</Button>
      </Link>
      <br></br>
      <Card bg="light" text="dark" border="primary">
        <Card.Header as="h1">404</Card.Header>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
          <Card.Text className="text-left">Sorry, page not found...</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotFound;
