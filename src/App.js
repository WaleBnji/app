import './App.css';
import RegisterAndLogin from './RegisterAndLogin';
import Home from './Home'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import {SkeletonTheme} from 'react-loading-skeleton'
 

function App() {
  return (
    <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
   <BrowserRouter >
   <Routes>
    <Route path='/' element={<RegisterAndLogin />} />
    <Route path='/home' element={<Home />} />
   </Routes>
   </BrowserRouter>

    </SkeletonTheme>
  );
}

export default App;
