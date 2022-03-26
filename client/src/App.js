import logo from './logo.svg';
import './App.css';
import Content from './Layouts/Content';
import Navbar from './Layouts/Navbar';
import Landing from './Pages/Landing';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Signin from './Pages/Authentication/Singin';
import Signup from './Pages/Authentication/Signup';
import Hero from './Pages/Authentication/Hero';
import Forum from './Pages/Forum/Forum';
import SingleQuestion from './Pages/Forum/SingleQuestion';
import Profile from './Pages/Profile/Profile';
import Tranlator from './Pages/Translation/Tranlator';
import VoiceDetector from './Pages/Translation/VoiceDetector';
import Books from './Pages/Translation/Books';
import Bot from './Pages/Chatbot/Bot';
import AuthRoute from './Routes/AuthRoute';
import ProtectedRoute from './Routes/ProtectedRoute';
import Loader from './Layouts/Loader';
import Logout from './Components/Logout';
import NotFound from './Layouts/NotFound';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Hero} />
        <AuthRoute path="/login" component={Signin} />
        <AuthRoute path="/register" component={Signup} />

        <ProtectedRoute path="/forum" component={Forum} />
        <ProtectedRoute path="/question/:id" component={SingleQuestion} />
        <ProtectedRoute path="/profile/:id" component={Profile} />
        <ProtectedRoute path="/translator" component={Tranlator} />
        <ProtectedRoute path="/voice" component={VoiceDetector} />
        <ProtectedRoute path="/libary" component={Books} />
        <ProtectedRoute path="/logout" component={Logout} />

        <Route path="*" component={NotFound} />
        
      </Switch>

      <Bot />
</Router>
    </>
)}

export default App;
