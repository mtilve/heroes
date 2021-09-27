import React from "react";
import Card from "react-bootstrap/Card";
import GeneralContext from "../store/GeneralContext";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CardHome(props) {
  const history = useHistory();
  const generalCtx = useContext(GeneralContext);
  const itemIsHero = generalCtx.itemIsHero(props.id);

  function toggleHeroStatusHandler() {
    if (itemIsHero) {
      generalCtx.removeHero(props.id);
    } else {
      generalCtx.addHero({
        id: props.id,
        name: props.name,
        image: props.image.url,
      });
    }
  }

  function detailHandler() {
    history.push({
      pathname: "/detail",
      state: { detail: props },
    });
  }

  return (
    <>
      <Card className="customCard" style={{ width: "12rem" }}>
        <Card.Title>{props.name}</Card.Title>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Inteligencia: {props.data.powerstats.intelligence}
              </ListGroup.Item>
              <ListGroup.Item>
                Fuerza: {props.data.powerstats.strength}
              </ListGroup.Item>
              <ListGroup.Item>
                Velocidad: {props.data.powerstats.speed}
              </ListGroup.Item>
              <ListGroup.Item>
                Durabilidad: {props.data.powerstats.durability}
              </ListGroup.Item>
              <ListGroup.Item>
                Poder: {props.data.powerstats.power}
              </ListGroup.Item>
              <ListGroup.Item>
                Combate: {props.data.powerstats.combat}
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col xs={6} md={6}>
              <Button
                variant="danger"
                className="w-responsive text-center mx-auto m-2"
                onClick={toggleHeroStatusHandler}
              >
                {itemIsHero ? "Quitar" : "Agregar"}
              </Button>
            </Col>

            <Col xs={6} md={6}>
              <Button
                variant="success"
                className="w-responsive text-center mx-auto m-2"
                onClick={detailHandler}
              >
                Detalle
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}

export default CardHome;
