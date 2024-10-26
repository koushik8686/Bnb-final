import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AdminLogin from './components/admins/AdminLogin';
import AdminHome from './components/admins/Home';
import JudgeLogin from './components/judges/JudgeLogin';
import JudgeSignup from './components/judges/JudgeSignup';
import TeamLeadsLogin from './components/teamleads/teamleadsLogin';
import TeamLeadsHome from './components/teamleads/teamleadsHome'
import JudgeHome from './components/judges/JudgeHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" Component={AdminLogin} />
          <Route path="/admin/home" Component={AdminHome} />
          <Route path="/judges/login" Component={JudgeLogin} />
          <Route path="/judges/signup" Component={JudgeSignup} />
          <Route path="/judges/home" Component={JudgeHome} />
          <Route path="/teamleads/login" Component={TeamLeadsLogin} />
          <Route path="/teamleads/home" Component={TeamLeadsHome} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;