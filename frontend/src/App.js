import logo from './logo.svg';
import './App.css';
import { Route , Routes , BrowserRouter} from 'react-router-dom'
import AdminLogin from './components/admins/AdminLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path='/admin/login' Component={AdminLogin} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
