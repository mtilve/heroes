import React from "react";
import { Formik, Field, Form } from "formik";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ModalLogin from "./Modal";
import { useHistory } from "react-router";
import { useState } from "react";

const FormLogin = () => {
  const history = useHistory();
  const [post, setPost] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_ALKEMY_URL;
  const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "El Email es requerido.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email inválido";
    }

    if (!values.password) {
      errors.password = "El Password es requerido.";
    } else if (values.password.length < 5) {
      errors.password = "El Password no puede ser menor a 5 caracteres.";
    }
    return errors;
  };

  /*
  React.useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);
    });
  }, []);
    
  const handle = () => {
    localStorage.setItem("Token", token);
  };
  const remove = () => {
    localStorage.removeItem("Token");
  };
*/

  function createPost(email, password) {
    axios
      .post(baseURL, {
        email: email,
        password: password,
      })
      .then((response) => {
        setPost(response.data.token);
        localStorage.setItem("Token", response.data.token);
        history.push("/home");
      })
      .catch((error) => {
        setShowLogin(true);
        localStorage.setItem("Token", null);
      });
  }

  return (
    <>
      {showLogin && (
        <ModalLogin title="Error 401 - Sin Autoriazción" body="El Email y/o Password ingresados no son correctos." show={showLogin} close={() => setShowLogin(false)} />
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
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
    </>
  );
};

export default FormLogin;
