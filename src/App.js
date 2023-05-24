import React, { Component } from "react";
import { NavComps } from "./Components";
import { Home, Sukses } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavComps />
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/Sukses" element={<Sukses />} exact />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
