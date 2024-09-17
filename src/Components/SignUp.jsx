import React, { useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";

export const SignUp = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  const validationSchema = Yup.object().shape({
    fName: Yup.string()
      .required("First Name is required")
      .min(2, "First name in at least more than 2 character")
      .matches(/^[A-Za-z]+$/, "First Name can only contain letters"),

    lName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last name in at least more than 2 character")
      .matches(/^[A-Za-z]+$/, "Last Name can only contain letters"),

    email: Yup.string().required("Email is required").email("Invalid email"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    cPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Password must match"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[+]?[\d\s-]{7,15}$/, "Invalid phone number format"),
  });

  return (
    <Formik
      initialValues={{
        fName: "",
        lName: "",
        email: "",
        password: "",
        cPassword: "",
        phone: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        localStorage.setItem("SignUp", JSON.stringify(values));
        alert(
          "Your form submitted successfully,\ncheck your data in LocalStorage"
        );
        setSubmitting(false);
      }}
    >
      {() => (
        <Form className="form3-container">
          <h1 className="header">Sign Up</h1>
          <div className="data-container">
            <div className="name-container">
              <div className="input-container">
                <label htmlFor="fName">First Name</label>
                <Field
                  type="text"
                  name="fName"
                  id="fName"
                  className="input-field"
                />
                <ErrorMessage
                  name="fName"
                  component="div"
                  className="error-msg"
                />
              </div>
              <div className="input-container">
                <label htmlFor="lName">Last Name</label>
                <Field
                  type="text"
                  name="lName"
                  id="lName"
                  className="input-field"
                />
                <ErrorMessage
                  name="lName"
                  component="div"
                  className="error-msg"
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="input-field"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-msg"
              />
            </div>
            <div className="password-container">
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <Field
                  type={isPasswordShown ? "text" : "password"}
                  name="password"
                  id="password"
                  className="input-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-msg"
                />
                <i
                  onClick={() => setIsPasswordShown((prevState) => !prevState)}
                  class="material-symbols-rounded icon"
                >
                  {isPasswordShown ? "key" : "key_off"}
                </i>
              </div>
              <div className="input-container">
                <label htmlFor="cPassword">Confirm Password</label>
                <Field
                  type={isConfirmPasswordShown ? "text" : "password"}
                  name="cPassword"
                  id="cPassword"
                  className="input-field"
                />
                <ErrorMessage
                  name="cPassword"
                  component="div"
                  className="error-msg"
                />
                <i
                  onClick={() =>
                    setIsConfirmPasswordShown((prevState) => !prevState)
                  }
                  class="material-symbols-rounded icon"
                >
                  {isConfirmPasswordShown ? "key" : "key_off"}
                </i>
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="phone">Phone Number</label>
              <Field
                type="tel"
                name="phone"
                id="phone"
                className="input-field"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-msg"
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
