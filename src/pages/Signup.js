import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const [signedUp, setSignedUp] = useState(false);

  const onSubmit = (data) => {
    let { name, username, password } = data;
    let reqBody = {
      name,
      username,
      password,
    };
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    };

    try {
      fetch("/api/auth/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.success) {
            return setError("username", {
              type: "manual",
              message: data.message,
            });
          } else {
            setSignedUp(true);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container flex justify-center align-items-center">
      {signedUp && <Redirect to="/signin" />}
      <form className="flex-column auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Name</label>
        <input
          {...register("name", {
            required: "Name field cannot be empty",
          })}
          type="text"
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <small className="color-error">{message}</small>
          )}
        />
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
        <label className="mt-1" htmlFor="">
          Confirm Password
        </label>
        <input
          {...register("confirmPassword", {
            required: "Confirm password field cannot be empty",
            validate: (value) =>
              value === getValues("password") || "Password does not match",
          })}
          type="password"
        />
        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ message }) => (
            <small className="color-error">{message}</small>
          )}
        />
        <button className="btn btn-dark-blue my-1" type="submit">
          Sign Up
        </button>
        <small>
          Already had an account? <Link to="/signin">Sign in</Link>
        </small>
      </form>
    </div>
  );
}
