import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Approvals from '../pages/Approvals';
import NewPost from '../pages/NewPost';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/home" component={Home} isPrivate />
    <Route path="/newPost" component={NewPost} isPrivate />
    <Route path="/approvals" component={Approvals} isPrivate adminOnly />
  </Switch>
);

export default Routes;
