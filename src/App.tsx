import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Home from './components/home/home';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
