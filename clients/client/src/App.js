import ReactDOM from "react-dom/client";
import Map from "./mapcomponents/map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/map"> Map </Link>
        <Routes>
          <Route exact path='/map' element={< Map />}></Route>
        </Routes>
      </div>
    </Router>
  );
}



export default App;
