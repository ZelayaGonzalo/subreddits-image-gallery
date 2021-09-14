import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Subreddit from './pages/Subreddit';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <Redirect to='/r/earthporn'/>
          </Route>
          <Route path="*">
            <Subreddit/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
