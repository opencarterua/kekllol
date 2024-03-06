// App.js
import MainPage from './pages/MainPage.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      {//<Route path='/books/create' element={<CreateBook />} />
      }
    </Routes>
  );
}

export default App;
