import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardHome from "./CardHome";

function GridHome(props)
  {
    return (
        <Container>
          <Row>
            {props.heroes.map((hero) => (
              <Col xs={12} md={4} className="d-flex justify-content-center mb-2" key={hero.id}>
                <CardHome
                  key={hero.id}
                  id={hero.id}
                  image={hero.image}
                  name={hero.name}
                  data={hero.data}
                />
              </Col>
            ))}
          </Row>
        </Container>
    );
  }

export default GridHome;
