import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="container landing">
      <div className="flex justify-center row h-100">
        <div className="col-6 flex justify-center my-auto">
          We help shorten your URL.
        </div>
        <div className="col-6 flex justify-center my-auto flex-column align-items-center">
          <Link to="signup" className="btn btn-dark-blue">
            Sign Up
          </Link>
          <Link to="signin" className="btn btn-light-blue mt-1">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
