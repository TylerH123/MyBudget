import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryTemplate from './pages/CategoryTemplate';
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
            <Route
              path="/subscriptions"
              element={<CategoryTemplate category={'Subscriptions'}/>}
            />
            <Route
              path="/utilities"
              element={<CategoryTemplate category={'Utilities'}/>}
            />
            <Route
              path="/vacation"
              element={<CategoryTemplate category={'Vacation'}/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
