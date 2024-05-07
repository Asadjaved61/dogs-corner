import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dogs from "./components/Dogs";
import DogDetails from "./components/DogDetails";

function App() {
  return (
    <>
      <header className='d-flex justify-content-center'>
        <h1>Dogs Corner</h1>
      </header>
      <Router>
        <Routes>
          <Route path='/details/:id' Component={DogDetails} />
          <Route path='/' Component={Dogs} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
