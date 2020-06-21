import React from "react";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <section>
      <NavBar />
      <h1 className="d-flex flex-column vh-100 align-items-center justify-content-center text-center">
        Welcome
      </h1>
    </section>
  );
};

export default Home;
