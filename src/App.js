import './App.css';
import RegisterAndLogin from './RegisterAndLogin';
import Home from './Home'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
 

function App() {
  return (
   <BrowserRouter >
   <Routes>
    <Route path='/' element={<RegisterAndLogin />} />
    <Route path='/home' element={<Home />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
