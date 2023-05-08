import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import './App.css';
import ShowProducts from './pages/ShowProducts/ShowProducts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
