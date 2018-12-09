import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import {firebasePlayers} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../ui/misc';

class AdminPlayers extends Component {
    state = {
        isLoading:true,
        players:[]
    }
    componentDidMount(){
        firebasePlayers.once('value').then((snapshot)=>{
            const players = firebaseLooper(snapshot);
            this.setState({
                isLoading:false,
                players: reverseArray(players)
            });
        })
    }
    render() {
        const {players} = this.state;
        return (
            <AdminLayout>
                <div className = "admin_player">
                <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    players.map( (player,i) =>(
                                        <TableRow key = {i}>
                                            <TableCell>
                                                <Link to = {`/admin_players/edit_player/${player.id}`}>
                                                {`${player.name} ${player.lastname}`}
                                                </Link>
                                             </TableCell>
                                             <TableCell> {player.number} </TableCell>
                                             <TableCell> {player.position} </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className = "admin_progress"> {this.state.isLoading ?  <CircularProgress thickness = {9} style = {{color:'orange'}} /> : null } </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminPlayers;