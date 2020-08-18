import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SignIn from '@modules/home/pages/SignIn';
import SignUp from '@modules/home/pages/SignUp';

import Dashboard from '@modules/users/pages/Dashboard';
import Profile from '@modules/users/pages/Profile';

import Aulas from '@modules/aulas/pages/Aulas';

import Forum from '@modules/forum/pages/Forum';
import Topic from '@modules/forum/pages/Topic';

import Bonus from '@modules/bonus/pages/Bonus';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />

        <Route path="/aulas" component={Aulas} isPrivate />
        <Route path="/aulas/:moduleId/:lessonId" component={Aulas} isPrivate />

        <Route path="/forum" component={Forum} isPrivate />
        <Route path="/topic/:topicId" component={Topic} isPrivate />

        <Route path="/bonus" component={Bonus} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
