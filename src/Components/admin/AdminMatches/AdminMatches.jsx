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

import {firebaseMatches} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../ui/misc';

class AdminMatches extends Component {
    state = {
        isLoading:true,
        matches:[]
    }
    componentDidMount(){
        firebaseMatches.once('value').then((snapshot)=>{
            const matches = firebaseLooper(snapshot);
            this.setState({
                matches: reverseArray(matches)
            });
        })
    }

    render() {
        const matches = this.state.matches;
        if (!matches.length > 0) return (
            <AdminLayout>
                <div className = "admin_progress">
                    <div>
                    <CircularProgress thickness = {6} style = {{color:'lightblue',textAlign:'center'}} /> 
                    </div>
                   
                </div> 
           </AdminLayout>
        )
                    
        
        return (
           <AdminLayout>
                <div className = "admin_progress">
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Match</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    matches.map( (match,i) =>(
                                        <TableRow key = {i}>
                                            <TableCell> {match.date} </TableCell>
                                            <TableCell>
                                                <Link to = {`/admin_matches/edit_match/${match.id}`}>
                                                    {match.away} <strong>-</strong> {match.local} 
                                                </Link>
                                             </TableCell>
                                            <TableCell> {match.resultAway} <strong>-</strong> {match.resultLocal} </TableCell>
                                            <TableCell> {match.final === "Yes"? <span style = {{color:"green"}}>{match.final}</span> : <span style = {{color:"red"}}>{match.final}</span>  } </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
               
           </AdminLayout>
        );
    }
}

export default AdminMatches;