import GridHome from "../components/GridHome";
import NavHome from "../components/NavBar";
import { useContext } from "react";
import GeneralContext from "../store/GeneralContext";
import CardTeam from "../components/CardTeam";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router";

function Home() {
  
  const history = useHistory();
  let token = localStorage.getItem('Token');
  if (!token){
    localStorage.removeItem("Token");
    history.push("/");
  }

  const generalCtx = useContext(GeneralContext);
  let content;

  if (generalCtx.totalHeroes === 0) {
    content = (
      <Row>
        <Col
          key={997}
          xs={6}
          md={4}
          className="d-flex justify-content-center"
        ></Col>
        <Col key={998} xs={6} md={4} className="d-flex justify-content-center">
          No hay heroes
        </Col>
        <Col
          key={999}
          xs={6}
          md={4}
          className="d-flex justify-content-center"
        ></Col>
      </Row>
    );
  } else {
    content = <GridHome heroes={generalCtx.heroes} />;
  }

  return (
    <div className="container">
      <NavHome home={true} search={false} detail={false}/>
      <div className="form-wrapper">
        <CardTeam heroes={generalCtx.heroes}/>
        {content}
      </div>
    </div>
  );
}

export default Home;
