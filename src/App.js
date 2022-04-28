import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Characters from './pages/Characters';

function App() {
  return (
    <Routes>
      <Route path='/:page_num' element={<Characters />} />
      <Route path='/' element={<Navigate to='/1' replace />} />
    </Routes>
  );
}

export default App;
