import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AdminLogin from './components/admins/AdminLogin';
import AdminHome from './components/admins/Home';
import JudgeLogin from './components/judges/JudgeLogin';
import JudgeSignup from './components/judges/JudgeSignup';
import TeamLeadsLogin from './components/teamleads/teamleadsLogin';
<<<<<<< HEAD
import TeamLeadsHome from './components/teamleads/teamleadsHome';
import TeamLeadsDashboard from './components/teamleads/teamleadsDashboard';
import TeamLeadsRegisteredGames from './components/teamleads/teamleadsRegister-Games';
import TeamLeadsRegisteredDetails from './components/teamleads/teamleadsRegister-Details';
import TeamLeadsList from './components/teamleads/teamleadsTeam-List';
import TeamLeadsStandings from './components/teamleads/teamleadsTeam-Standings';
import TeamLeadsContact from './components/teamleads/teamleadsChatBot';
=======
import TeamLeadsHome from './components/teamleads/teamleadsHome'
import JudgeHome from './components/judges/JudgeHome';

>>>>>>> 9edddcedd1daadac581d181722c50bff9fd758a0
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
          <Route path="/teamleads/dashboard" Component={TeamLeadsDashboard} />
          <Route path="/teamleads/registered-games" Component={TeamLeadsRegisteredGames}/>
          <Route path="/teamleads/registration-details" Component={TeamLeadsRegisteredDetails}/>
          <Route path="/teamleads/team-list" Component={TeamLeadsList}/>
          <Route path="/teamleads/table-standing" Component={TeamLeadsStandings}/>
          <Route path="/teamleads/contact" Component={TeamLeadsContact}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;