import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Food from './pages/Food';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/food"
              element={<Food />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
