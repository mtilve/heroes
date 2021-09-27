import React from "react";
import Card from "react-bootstrap/Card";
import GeneralContext from "../store/GeneralContext";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalLogin from "../components/Modal";

function CardSearch(props) {
  const [showModal, setShowModal] = useState(false);
  const [textModal, setTextModal] = useState("");
  const generalCtx = useContext(GeneralContext);
  const itemIsHero = generalCtx.itemIsHero(props.hero.id);

  function toggleHeroStatusHandler() {
    setShowModal(false);
    setTextModal("");
    if (itemIsHero) {
      generalCtx.removeHero(props.hero.id);
    } else {
      if (generalCtx.totalHeroes < 6) {
        let heroes = generalCtx.heroes;

        let good = heroes.filter(
          (x) => x.data.biography.alignment === "good"
        ).length;
        let bad = heroes.length - good;

        if (props.hero.biography.alignment === "good") {
          if (good < 3) {
            generalCtx.addHero({
              id: props.hero.id,
              name: props.hero.name,
              image: props.hero.image.url,
              data: props.hero,
            });
          } else {
            setShowModal(true);
            setTextModal("No puede haber mas de 3 miembros buenos en el equipo.");
          }
        }

        if (props.hero.biography.alignment === "bad") {
          if (bad < 3) {
            generalCtx.addHero({
              id: props.hero.id,
              name: props.hero.name,
              image: props.hero.image.url,
              data: props.hero,
            });
          } else {
            setShowModal(true);
            setTextModal("No puede haber mas de 3 miembros malos en el equipo.");
          }
        }
      } else {
        // cant add more than 6 heroes
        setShowModal(true);
        setTextModal("No puede haber mas de 6 miembros en el equipo.");
      }
    }
  }

  return (
    <div key={props.hero.id}>
      {showModal && (
        <ModalLogin key={props.hero.id} title="Error" body={textModal} show={showModal} close={() => setShowModal(false)} />
      )}
      <Card key={props.hero.id} style={{ width: "12rem" }}>
        <Card.Img variant="top" src={props.hero.image.url} />
        <Card.Body>
          <Card.Title>{props.hero.name}</Card.Title>
        </Card.Body>
        <Card.Footer className="w-responsive text-center">
          <Button
            variant={itemIsHero ? "danger" : "primary"}
            onClick={toggleHeroStatusHandler}
          >
            {itemIsHero ? "Quitar" : "Agregar"}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default CardSearch;
