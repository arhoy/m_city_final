import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route, Redirect }  from 'react-router-dom';
import PrivateRoutes from './Components/authRoutes/PrivateRoutes';
import PublicRoutes from './Components/authRoutes/PublicRoutes';

import Home from './Components/home';
import Team from './Components/Team/Team';
import Matches from './Components/Matches/Matches';
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Components/admin/Dashboard/Dashboard';
import AdminMatches from './Components/admin/AdminMatches/AdminMatches';
import AddEditMatch from './Components/admin/AdminMatches/AddEditMatch';
import AdminPlayers from './Components/admin/AdminPlayers/AdminPlayers';
import AddEditPlayer from './Components/admin/AdminPlayers/AddEditPlayer';
import NotFound from './Components/ui/NotFound';

const Routes = (props) => {
  const user = props;
  return(
    <Layout>
        <Switch>
            <Route exact component={Home} path="/"/>
            <Route user = {user} {...props} exact component={Team} path="/the_team"/>
            <Route user = {user} {...props} exact component={Matches} path="/the_matches"/>
            <PublicRoutes user = {user} {...props} exact component={SignIn} path="/signin" />
            <PrivateRoutes user = {user} {...props} exact component = {Dashboard} path = "/dashboard"/>
            <PrivateRoutes user = {user} {...props} exact component = {AdminMatches} path = "/admin_matches"/>
            <PrivateRoutes user = {user} {...props} exact component = {AdminPlayers} path = "/admin_players"/>

            <PrivateRoutes user = {user} {...props} exact component = {AddEditMatch} path = "/admin_matches/edit_match/:id"/>
            <PrivateRoutes user = {user} {...props} exact component = {AddEditMatch} path = "/admin_matches/edit_match"/>
          
            <PrivateRoutes user = {user} {...props} exact component = {AddEditPlayer} path = "/admin_players/edit_player/:id"/>
            <PrivateRoutes user = {user} {...props} exact component = {AddEditPlayer} path = "/admin_players/add_player"/>

            <Route user = {user} {...props} component={NotFound} />
            
        </Switch>
    </Layout>
  )
}

export default Routes;
