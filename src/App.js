import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import FormLogin from "./pages/Login";
import Detail from "./pages/Detail";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <FormLogin />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/detail">
        <Detail />
      </Route>
    </Switch>
  );
}

export default App;
