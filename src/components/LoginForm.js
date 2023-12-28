import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const initialValues = { username: "", email: "", password: "" };

  const onSubmit = (values) => {
    console.log("OnSubmit", values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
  });

  return (
    <div>
      <h1>Sign Up/Sign in</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                type="text"
                name="username"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <Field type="password" name="password" />
            </div>
            <div>
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <button type="submit">
                Submit
              </button>

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
