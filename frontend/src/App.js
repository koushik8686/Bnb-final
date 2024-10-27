import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AdminLogin from './components/admins/AdminLogin';
import AdminHome from './components/admins/Home';
import JudgeLogin from './components/judges/JudgeLogin';
import JudgeSignup from './components/judges/JudgeSignup';
import TeamLeadsLogin from './components/teamleads/teamleadsLogin';
import TeamLeadsHome from './components/teamleads/teamleadsHome';
import TeamLeadsDashboard from './components/teamleads/teamleadsDashboard';
import TeamLeadsRegisteredGames from './components/teamleads/teamleadsRegister-Games';
import TeamLeadsRegisteredDetails from './components/teamleads/teamleadsRegister-Details';
import TeamLeadsList from './components/teamleads/teamleadsTeam-List';
import TeamLeadsStandings from './components/teamleads/teamleadsTeam-Standings';
import TeamLeadsContact from './components/teamleads/teamleadsChatBot';
import JudgeHome from './components/judges/JudgeHome';
import JudgeGame from './components/judges/JudgeGame';
import UserHome from './components/user/UserHome';
import UserLogin from './components/user/UserLogin';
import UserRegister from './components/user/UserRegister';
import Landing from './components/Landing';
import TeamPointsTable from './components/PointsTablePage';
import AdminGraphs from './components/admins/graph';
import AdvertisementAnalytics from './components/admins/graph';
import Chat from './components/user/Chat';
import NotFound from './components/NotFound';
import DynamicCertificateGenerator from './components/user/Certificate';
import Cert from './components/user/Cert';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/user/login' Component={UserLogin} />
          <Route path='/' Component={Landing} />
          <Route path='/user/register' Component={UserRegister} />
          <Route path='/user/home' Component={UserHome} />
          <Route path='/user/chat' Component={Chat} />
          <Route path='/user/certs' Component={DynamicCertificateGenerator} />
          <Route path='/user/:id/:number' Component={Cert} />
          <Route path="/admin/login" Component={AdminLogin} />
          <Route path="/admin/graph" Component={AdvertisementAnalytics}/>
          <Route path="/admin/home" Component={AdminHome} />
          <Route path="/judges/login" Component={JudgeLogin} />
          <Route path="/judges/signup" Component={JudgeSignup} />
          <Route path="/judges/home" Component={JudgeHome} />
          <Route path="/judge/:game" Component={JudgeGame} />
          <Route path="/teamleads/login" Component={TeamLeadsLogin} />
          <Route path="/teamleads/home" Component={TeamLeadsHome} />
          <Route path="/teamleads/dashboard" Component={TeamLeadsDashboard} />
          <Route path="/teamleads/registered-games" Component={TeamLeadsRegisteredGames}/>
          <Route path="/teamleads/registration-details" Component={TeamLeadsRegisteredDetails}/>
          <Route path="/teamleads/team-list" Component={TeamLeadsList}/>
          <Route path="/teamleads/table-standing" Component={TeamLeadsStandings}/>
          <Route path="/teamleads/contact" Component={TeamLeadsContact}/>
          <Route path="/game/:game" Component={TeamPointsTable}/>
          <Route path='*' Component={NotFound}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;