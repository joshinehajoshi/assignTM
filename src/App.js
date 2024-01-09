import './App.css';
import Home from './Components';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PersonDetails from './Components/PersonDetails';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/person-details/:id' component={PersonDetails} exact/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
