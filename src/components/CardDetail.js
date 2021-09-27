import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CardDetail(props) {
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center"
          >
            <Card className="customCard mb-2" style={{ width: "18rem" }}>
              <Card.Title>{props.hero.name}</Card.Title>
              <Card.Img variant="top" src={props.hero.image} />
            </Card>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center"
          >
            <Card className="mb-2" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Peso:{" "}
                      {props.hero.data.appearance.weight.length > 1
                        ? props.hero.data.appearance.weight[1]
                        : ""}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Altura:{" "}
                      {props.hero.data.appearance.weight.length > 1
                        ? props.hero.data.appearance.height[1]
                        : ""}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Nombre: {props.hero.data.biography["full-name"]}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Alias: {props.hero.data.biography.aliases.join(', ')}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Color de ojos: {props.hero.data.appearance["eye-color"]}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Color de cabello:{" "}
                      {props.hero.data.appearance["hair-color"]}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Lugar de trabajo: {props.hero.data.work.base}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center"
          >
            <Card className="mt-2 mb-2" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Powerstats</Card.Title>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Inteligencia: {props.hero.data.powerstats.intelligence}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Fuerza: {props.hero.data.powerstats.strength}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Velocidad: {props.hero.data.powerstats.speed}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Durabilidad: {props.hero.data.powerstats.durability}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Poder: {props.hero.data.powerstats.power}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Combate: {props.hero.data.powerstats.combat}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CardDetail;
