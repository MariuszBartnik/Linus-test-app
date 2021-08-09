import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProjectSelectionScreen from './views/ProjectSelectionScreen';
import InvestmentScreen from './views/InvestmentScreen';
import ConfirmationScreen from './views/ConfirmationScreen';
import {store} from './store/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
            <Switch>
              <Route path="/confirm" component={ConfirmationScreen}/>
              <Route path="/project" component={InvestmentScreen}/>
              <Route path="/" component={ProjectSelectionScreen}/>
            </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;