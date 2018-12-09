import React, { Component } from 'react';
import { firebaseMatches, firebase } from '../../firebase';
import { firebaseLooper ,reverseArray } from '../ui/misc';
import LeagueTable from './table';
import MatchesList from './MatchesList';

class Matches extends Component {
    state = {
        loading:true,
        matches:[],
        filterMatches:[],
        playedFilter:'All',
        resultFilter:'All'
    }
    componentDidMount() {
        firebaseMatches.once('value')
            .then( snapshot =>{
                const matches = firebaseLooper(snapshot);

                this.setState({
                    loading:false,
                    matches:reverseArray(matches),
                    filterMatches: reverseArray(matches)
                })
            })
            .catch( ex => { console.log('There was an error!')})
    }
    
    showPlayed = (played) =>{
        const matches = [...this.state.matches];

        if(played === 'All'){
            this.setState({filterMatches:matches,playedFilter:played});
        }
        else{
            const list = matches.filter(match => match.final === played);
            this.setState({ filterMatches:list,playedFilter:played});
        }
    }
    showResult = (result) =>{
        const matches = [...this.state.matches];

        if(result === 'All'){
            this.setState({filterMatches:matches});
        }
        else{
            const list = matches.filter(match => match.result === result);
            this.setState({ filterMatches:list});
        }
    }

    render() {
        console.log(this.state.filterMatches);
        if (!this.state.loading) return (
            <div className = "the_matches_container">
                <div className = "the_matches_wrapper">
                    <div className = "left">
                        <div className = "match_filters">
                                <div className = "match_filters_box">
                                    <div className = "tag">
                                            Show Match
                                    </div>
                                    <div className = "cont">
                                            <div className = {`option`} onClick = { ()=> this.showPlayed('All')} >
                                                All       
                                            </div>
                                            <div className = {`option`} onClick = { ()=> this.showPlayed('Yes')} >
                                                Played       
                                            </div>
                                            <div className = {`option`} onClick = { ()=> this.showPlayed('No')} >
                                                Not Played       
                                            </div>
                                    </div>
                                </div>
                                <div className = "match_filters_box">
                                    <div className = "tag">
                                            Result Game
                                    </div>
                                    <div className = "cont">
                                            <div className = {`option`} onClick = { ()=> this.showResult('All')} >
                                                All
                                            </div>
                                            <div className = {`option`} onClick = { ()=> this.showResult('W')} >
                                                Win       
                                            </div>
                                            <div className = {`option`} onClick = { ()=> this.showResult('L')} >
                                                Loss     
                                            </div>
                                            <div className = {`option`} onClick = { ()=> this.showResult('D')} >
                                                Draw     
                                            </div>
                                    </div>
                               </div>
                        </div>

                         <MatchesList
                                matches = {this.state.filterMatches}
                         />
                    </div>
                        <div className = "right">
                            <LeagueTable/>
                        </div>
                </div>
            </div>
        )
        return (
            <div>
        
                
            </div>
        );
    }
}

export default Matches;