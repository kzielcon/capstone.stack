import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import "./index.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}
// import "./index.css";
// import { Fragment } from "react";
// import { Routes, Route } from "react-router-dom"
// import Login from './components/Login';

// //components

// function App() {
//   return (
//       <Login />
//       // <Routes>
//       //   <Route path='/login' element={<Login />} />
//       // </Routes>
//   );
// }

// export default App;
