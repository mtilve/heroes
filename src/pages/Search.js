import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardSearch from "../components/CardSearch";
import NavHome  from "../components/NavBar";
import Footer from "../components/Footer";

function Search(props) {
  const baseURL = "https://superheroapi.com/api.php/10225949487784340/search/";
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
        console.log(response);
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
      <>
        <Col
          key={997}
          xs={6}
          md={4}
          className="d-flex justify-content-center"
        ></Col>
        <Col 
          key={998}
          xs={6} 
          md={4} 
          className="d-flex justify-content-center">
          Sin datos
        </Col>
        <Col
          key={999}
          xs={6}
          md={4}
          className="d-flex justify-content-center"
        ></Col>
      </>
    );
    return items;
  }

  return (
    <div className="container">
      <NavHome home={false} search={true} detail={false}/>
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

      <Container className="mt-2 customWrapper">
        <Row>{createItems()}</Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default Search;
