import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CardSearch from "../components/CardSearch";
import NavHome from "../components/NavBar";
import { useHistory } from "react-router";

function Search(props) {
  const history = useHistory();
  let token = localStorage.getItem("Token");
  if (!token) {
    localStorage.removeItem("Token");
    history.push("/");
  }

  const baseURL =
    process.env.REACT_APP_BASE_HERO_API +
    process.env.REACT_APP_TOKEN +
    "/search/";
  const [isLoading, setIsLoading] = useState(true);
  const [loadedHeroes, setLoadedHeroes] = useState([]);

  const validateForm = (values) => {
    const errors = {};

    if (!values.query) {
      errors.query = "Es necesario ingresar un heroe.";
    } else if (!/^[A-Z0-9- ]+$/i.test(values.query)) {
      errors.query = "Nombre de heroe inválido.";
    }
    return errors;
  };

  function queryGetPost(query) {
    setIsLoading(true);
    axios
      .get(baseURL + query, {})
      .then(function (response) {
        if (response.status === 200 && response.data.response !== "error") {
          setLoadedHeroes(response.data.results);
        } else {
          setLoadedHeroes([]);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
        setIsLoading(false);
      });
  }

  function createItems() {
    let items = [];
    if (loadedHeroes.length > 0) {
      for (let i = 0; i < loadedHeroes.length; i++) {
        items.push(
          <Col
            key={loadedHeroes[i].id}
            xs={6}
            md={4}
            className="d-flex justify-content-center mb-2"
          >
            <CardSearch key={loadedHeroes[i].id} hero={loadedHeroes[i]} />
          </Col>
        );
      }
      return items;
    }

    items.push(
      <Col
        key={997}
        xs={12}
        md={4}
        className="d-flex justify-content-center"
      ></Col>
    );
    items.push(
      <Col key={998} xs={12} md={4} className="d-flex justify-content-center">
        Sin datos
      </Col>
    );
    items.push(
      <Col
        key={999}
        xs={12}
        md={4}
        className="d-flex justify-content-center"
      ></Col>
    );

    return items;
  }

  return (
    <div className="container">
      <NavHome home={false} search={true} detail={false} />
      <div className="form-wrapper"></div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            queryGetPost(values.query);
          }, 1000);
        }}
        validate={validateForm}
      >
        {(formik, isSubmitting) => (
          <Form>
            <div className="w-responsive text-center mx-auto p-3">
              <Field
                name="query"
                className={
                  formik.touched.query && formik.errors.query
                    ? "form-control is-invalid mt-2"
                    : "form-control mt-2"
                }
                type="text"
              />
              {formik.touched.query && formik.errors.query ? (
                <div className="invalid-feedback">{formik.errors.query}</div>
              ) : null}

              <Button
                className="mt-2 customButton"
                type="submit"
                variant="success"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Espere por favor..." : "Buscar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <Container className="mt-2">
        <Row>{createItems()}</Row>
      </Container>
    </div>
  );
}

export default Search;
