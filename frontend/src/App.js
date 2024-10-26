import logo from './logo.svg';
import './App.css';
import { Route , Routes , BrowserRouter} from 'react-router-dom'
import AdminLogin from './components/admins/AdminLogin';
import AdminHome from './components/admins/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path='/admin/login' Component={AdminLogin} />
        <Route path='/admin/home' Component={AdminHome} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
