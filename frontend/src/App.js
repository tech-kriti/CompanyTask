
import './App.css';
import { Route , Routes} from 'react-router-dom';
import Home from './componnents/home/Home';
import Reviews from './componnents/review/Reviews';

function App() {
  return (
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/reviews/:id" element={<Reviews/>}></Route>
   </Routes>
  );
}

export default App;
