import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [signedIn, setSignedIn] = useState(false);

  const onSubmit = (data) => {
    let { username, password } = data;
    let reqBody = {
      username,
      password,
    };
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    };

    try {
      fetch("/api/auth/signin", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            return setError("username", {
              type: "manual",
              message: data.message,
            });
          } else {
            localStorage.setItem("user", JSON.stringify(data.value));
            setSignedIn(true);
            return <Redirect to="/home" />;
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container flex justify-center align-items-center">
      {signedIn && <Redirect to="/home" />}
      <form className="flex-column auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="mt-1" htmlFor="">
          Username
        </label>
        <input
          {...register("username", {
            required: "Username field cannot be empty",
          })}
          type="text"
        />
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }) => (
            <small className="color-error">{message}</small>
          )}
        />
        <label className="mt-1" htmlFor="">
          Password
        </label>
        <input
          {...register("password", {
            required: "Password field cannot be empty",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <small className="color-error">{message}</small>
          )}
        />
        <button className="btn btn-dark-blue my-1" type="submit">
          Sign In
        </button>
        <small>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </small>
      </form>
    </div>
  );
}
