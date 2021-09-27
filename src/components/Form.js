import React from "react";
import { Formik, Field, Form } from "formik";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalLogin from "./Modal";
import { useHistory } from "react-router";

const FormLogin = () => {
  const baseURL = "http://challenge-react.alkemy.org/";
  const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 5) {
      errors.password = "Must not be 5 characters or less";
    }
    return errors;
  };

  const [post, setPost] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [token, setToken] = React.useState("");
  /*
  React.useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);
    });
  }, []);
    */
  const handle = () => {
    localStorage.setItem("Token", token);
  };
  const remove = () => {
    localStorage.removeItem("Token");
  };

  function createPost(email, password) {
    axios
      .post(baseURL, {
        email: email,
        password: password,
      })
      .then((response) => {
        setPost(response.data.token);
        setToken(response.data.token);
      })
      .catch((error) => {
        setShowLogin(true);
        //alert(`Error: ${error.message}`);
        //console.error('There was an error!', error);
      });
  }

  const history = useHistory();
  if (token) {
    history.push("/home");
  }

  return (
    <div>
      {showLogin && (
        <ModalLogin title="Error 401 - Sin Autoriazción" body="El Email y Password ingresados no son correctos." show={showLogin} close={() => setShowLogin(false)} />
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          //
          setTimeout(() => {
            //alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            setToken("");
            createPost(values.email, values.password);
          }, 1000);
        }}
        validate={validateForm}
      >
        {(formik, isSubmitting) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                className={
                  formik.touched.password && formik.errors.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="password"
              />

              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="form-group pt-3 row justify-content-center">
              <Button type="submit" variant="success" disabled={isSubmitting}>
                {isSubmitting ? "Espere por favor..." : "Enviar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormLogin;
