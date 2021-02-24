import React from "react";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import "./App.css";

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField(props, "checkbox");

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const App = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "mindestens 3 Zeichen")
            .max(15, "maximal 15 Zeichen")
            .required("required"),
          email: Yup.string()
            .email("keine gültige E-Mail Adresse")
            .required("required"),
          acceptedTerms: Yup.boolean()
            .required("required")
            .oneOf([true], "Sie müssen den Terms & Conditions zustimmen"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 3000);
        }}
      >
        {(props) => {
          <Form>
            <h1>Sign Up, or what ever...</h1>
            <CustomTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="Cacy"
            />
            <CustomTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Cacy@gmail.com"
            />
            <CustomCheckbox name="acceptedTerms">
              Ich akzeptiere die Terms und Conditions
            </CustomCheckbox>
            <button type="submit">
              {props.isSubmitting ? "...läd" : "gesendet"}
            </button>
          </Form>;
        }}
      </Formik>
      test
    </>
  );
};

export default App;
