import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Test from "./maptest/Test";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/map"> Map </Link> */}
        <Routes>
          <Route exact path='/map' element={< Test />}></Route>
        </Routes>
      </div>
    </Router>
  );
}



export default App;
