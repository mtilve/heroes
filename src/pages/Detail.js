import CardDetail from "../components/CardDetail";
import { useLocation } from "react-router-dom";
import NavHome  from "../components/NavBar";
import Footer from "../components/Footer";

function Detail(props) {
  const location = useLocation();

  return (
    <div className="container">
      <NavHome home={false} search={false} detail={true}/>
      <div className="form-wrapper customWrapper">
        <CardDetail hero={location.state.detail}/>
      </div>  
      <Footer/>
    </div>
  );
}

export default Detail;
