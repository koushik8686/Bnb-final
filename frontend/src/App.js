import './App.css';
import { Route , Routes , BrowserRouter} from 'react-router-dom'
import AdminLogin from './components/admins/AdminLogin';
import AdminHome from './components/admins/Home';
import JudgeLogin from './components/judges/JudgeLogin'
import JudgeSignup from './components/judges/JudgeSignup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path='/admin/login' Component={AdminLogin} />
        <Route path='/admin/home' Component={AdminHome} />
        <Route path='/judges/login' Component={JudgeLogin} />
        <Route path ='/judges/signup' Component={JudgeSignup}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
