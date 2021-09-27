import CardDetail from "../components/CardDetail";
import { useLocation } from "react-router-dom";
import NavHome  from "../components/NavBar";
import { useHistory } from "react-router";

function Detail(props) {
  const location = useLocation();
  const history = useHistory();
  let token = localStorage.getItem('Token');
  if (!token){
    localStorage.removeItem("Token");
    history.push("/");
  }

  return (
    <div className="container">
      <NavHome home={false} search={false} detail={true}/>
      <div className="form-wrapper">
        <CardDetail hero={location.state.detail}/>
      </div>  
    </div>
  );
}

export default Detail;
