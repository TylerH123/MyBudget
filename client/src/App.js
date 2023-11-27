import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryTemplate from './pages/CategoryTemplate';

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
              element={<CategoryTemplate category={'Food'} displayCSVImporter={true}/>}
            />
            <Route
              path="/subscriptions"
              element={<CategoryTemplate category={'Subscriptions'} displayCSVImporter={false}/>}
            />
            <Route
              path="/utilities"
              element={<CategoryTemplate category={'Utilities'} displayCSVImporter={false}/>}
            />
            <Route
              path="/vacation"
              element={<CategoryTemplate category={'Vacation'} displayCSVImporter={false}/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
