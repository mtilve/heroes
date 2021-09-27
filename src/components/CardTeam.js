import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CardTeam(props) {
  let content1 = [];
  let content2 = [];
  let content3 = [];

  if (props.heroes.length === 0) {
    content1.push(<ListGroup.Item key={100}>Inteligencia: 0</ListGroup.Item>);
    content1.push(<ListGroup.Item key={101}>Fuerza: 0</ListGroup.Item>);
    content1.push(<ListGroup.Item key={102}>Velocidad: 0</ListGroup.Item>);

    content2.push(<ListGroup.Item key={103}>Durabilidad: 0</ListGroup.Item>);
    content2.push(<ListGroup.Item key={104}>Poder: 0</ListGroup.Item>);
    content2.push(<ListGroup.Item key={105}>Combate: 0</ListGroup.Item>);

    content3.push(<ListGroup.Item key={106}>Altura Promedio: 0 cm</ListGroup.Item>);
    content3.push(<ListGroup.Item key={107}>Peso Promedio: 0 kg</ListGroup.Item>);

  } else {
    let content = sortSumPowerstats();
    content1 = content[0];
    content2 = content[1];
    content3 = content[2];
  }

  function sortSumPowerstats() {
    let heroes = props.heroes;
    let content1 = [];
    let content2 = [];
    let content3 = [];

    var powerstats = {
      intelligence: heroes
        .map((item) => parseInt(item.data.powerstats.intelligence))
        .reduce((prev, curr) => prev + curr, 0),
      strength: heroes
        .map((item) => parseInt(item.data.powerstats.strength))
        .reduce((prev, curr) => prev + curr, 0),
      speed: heroes
        .map((item) => parseInt(item.data.powerstats.speed))
        .reduce((prev, curr) => prev + curr, 0),
      durability: heroes
        .map((item) => parseInt(item.data.powerstats.durability))
        .reduce((prev, curr) => prev + curr, 0),
      power: heroes
        .map((item) => parseInt(item.data.powerstats.power))
        .reduce((prev, curr) => prev + curr, 0),
      combat: heroes
        .map((item) => parseInt(item.data.powerstats.combat))
        .reduce((prev, curr) => prev + curr, 0),
    };

    let arrayStats = Object.entries(powerstats);
    arrayStats.sort(function (a, b) {
      return b[1] - a[1];
    });

    for (var i = 0; i < arrayStats.length; i++) {
      switch (arrayStats[i][0]) {
        case "combat":
          if (i < 3) {
            content1.push(<ListGroup.Item key={108}>Combate: {arrayStats[i][1]}</ListGroup.Item>);
          } else {
            content2.push(<ListGroup.Item key={109}>Combate: {arrayStats[i][1]}</ListGroup.Item>);
          }
          break;
        case "intelligence":
          if (i < 3) {
            content1.push(<ListGroup.Item key={110}>Inteligencia: {arrayStats[i][1]}</ListGroup.Item>);
          } else {
            content2.push(<ListGroup.Item key={111}>Inteligencia: {arrayStats[i][1]}</ListGroup.Item>);
          }
          break;
        case "durability":
          if (i < 3) {
            content1.push(<ListGroup.Item key={112}>Durabilidad: {arrayStats[i][1]}</ListGroup.Item>);
          } else {
            content2.push(<ListGroup.Item key={113}>Durabilidad: {arrayStats[i][1]}</ListGroup.Item>);
          }
          break;
        case "power":
          if (i < 3) {
            content1.push(<ListGroup.Item key={114}>Poder: {arrayStats[i][1]}</ListGroup.Item>);
          } else {
            content2.push(<ListGroup.Item key={115}>Poder: {arrayStats[i][1]}</ListGroup.Item>);
          }
          break;
        case "speed":
          if (i < 3) {
            content1.push(<ListGroup.Item key={116}>Velocidad: {arrayStats[i][1]}</ListGroup.Item>);
          } else {
            content2.push(<ListGroup.Item key={117}>Velocidad: {arrayStats[i][1]}</ListGroup.Item>);
          }
          break;
        case "strength":
          if (i < 3) {
            content1.push(<ListGroup.Item key={118}>Fuerza: {arrayStats[i][1]}</ListGroup.Item>);
          } else {
            content2.push(<ListGroup.Item key={119}>Fuerza: {arrayStats[i][1]}</ListGroup.Item>);
          }
          break;
        default:
          content1.push(<></>);
          content2.push(<></>);
          break;
      }
    }

    var height_weight = {
        height: heroes
          .map((item) => parseInt(item.data.appearance.height[1].split(" ")[0]))
          .reduce((prev, curr) => prev + curr, 0),
          weight: heroes
          .map((item) => parseInt(item.data.appearance.weight[1].split(" ")[0]))
          .reduce((prev, curr) => prev + curr, 0)
    };

    content3.push(<ListGroup.Item key={120}>Altura Promedio: {(height_weight.height / heroes.length).toFixed(2)} cm</ListGroup.Item>);    
    content3.push(<ListGroup.Item key={121}>Peso Promedio: {(height_weight.weight / heroes.length).toFixed(2)} kg</ListGroup.Item>);

    return [content1, content2, content3];
  }

  return (
    <div>
      <Container className="mt-2 mb-2">
        <Row>
        <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center">
            <Card className="mb-2" style={{ width: "18rem" }}>
              <Card.Body>
                  <ListGroup variant="flush">{content1}</ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center">
            <Card className="mb-2" style={{ width: "18rem" }}>
              <Card.Body>
                  <ListGroup variant="flush">{content2}</ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center">
            <Card className="mb-2" style={{ width: "18rem" }}>
              <Card.Body>
                  <ListGroup variant="flush">{content3}</ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CardTeam;
