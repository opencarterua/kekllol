// App.js
import MainPage from './pages/MainPage.js';
import ShopCart from './pages/ShopCart.js'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/cart/:cartItems' exact element={<ShopCart />} />
    </Routes>
  );
}

export default App;
