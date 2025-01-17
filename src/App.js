import "./App.css";
import Header from "./Components/Header";
import CardsDetails from "./Components/CardsDetails";
import Cards from "./Components/Cards";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cards/>}></Route>
        <Route path="/cart/:id" element={<CardsDetails/>}></Route>
      </Routes>
    </>
  );
}

export default App;
