import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {firebase} from '../../../firebase';


const AdminNav = () => {

    const links = [
        {title: "Matches", linkTo: "/admin_matches"},
        {title: "Add Match", linkTo: "/admin_matches/edit_match"},
        {title: "Players", linkTo: "/admin_players"},
        {title: "Add Player", linkTo: "/admin_players/add_player"},
        {title: "Sign In", linkTo: "/signin"},
        {title: "Home", linkTo: "/"}
    ]

    const style = {
            primary: {
                borderBottom: 'solid 1px white',
                color:'white'
            },
            secondary: {
                borderBottom: 'solid 1px white',
                color:'lightgrey'
            }
    };
    const logoutEventHandler = () =>{
        firebase.auth().signOut()
            .then( ()=> console.log('logging out') )
            .catch(ex =>{console.log('not able to signout!')})
    }

    const renderItems = ()=>(

        links.map(link=>(
            <Link key = {link.title} to = {link.linkTo}><ListItem style={style.primary}>{link.title}</ListItem></Link>
        ))    
    )

    return (
        <div>
            {renderItems()}
            <Link to = "/"> <ListItem button onClick = {logoutEventHandler} style = {style.secondary}>Logout</ListItem></Link>
        </div>
    );
};

export default AdminNav;