import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Item from './components/Item';

import Footer from './components/Footer';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Item />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
