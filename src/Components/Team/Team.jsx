import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import PlayerCard from '../ui/playerCard';
import { firebasePlayers, firebase } from '../../firebase';
import {firebaseLooper} from '../ui/misc';
import Stripes from '../../Resources/images/stripes.png';


class Team extends Component {
    state = {
        loading:true,
        players:[]
    }
    componentDidMount() {

       firebasePlayers.once('value')
        .then( snapshot=>{
           const players = firebaseLooper(snapshot);
           // code below is to grab image from firebase storage and store it in the player state. Using promises is standard practice.
           let promises = [];
           for (let key in players){
               promises.push(
                   new Promise( (resolve,reject)=>{
                        firebase.storage().ref('players')
                        .child(players[key].image).getDownloadURL()
                            .then(  url =>{
                                players[key].url = url;
                                resolve();
                            })
                   })
               )
           }
           Promise.all(promises).then(()=>{
                this.setState({
                    players,
                    loading:false
                })
           })
       
        })
        .catch( ex =>{ console.log('there was a error in cdm', ex)});

      
    }

    showplayersByCategory = (category) =>{
        const {players} = this.state;
        const playerArray = [...players];
        const filteredArray =  playerArray.filter(player=> player.position === category);
        if(players.length > 0){
            return (
                filteredArray.map( (player,key) =>(
                    <Fade left delay = {key*100} key = {key}>
                    <div className = "item">
                          <PlayerCard
                              name = {player.name}
                              lastname = {player.lastname}
                              number = {player.number}
                              bck ={player.url}
                          />
                    </div>
                  </Fade> 
                ))     
            )
        }
        else{
            return null;
        }
       
    }

    render() {
  
        if (this.state.loading) return (
            <div className = "the_team_container"  style = {{background: `url(${Stripes})`,textAlign:'center', fontSize: 24}}> Loading Players... </div>
        )
        return (
            <div className = "the_team_container"
                style = {{background: `url(${Stripes})`}}
            >


                <div className = "team_category_wrapper">
                        <div className = "title">Keepers</div>
                        <div className = "team_cards">
                            {this.showplayersByCategory('Keeper')}
                        </div>
                </div>

                <div className = "team_category_wrapper">
                        <div className = "title">Defence</div>
                        <div className = "team_cards">
                            {this.showplayersByCategory('Defence')}
                        </div>
                </div>

                <div className = "team_category_wrapper">
                        <div className = "title">Midfield</div>
                        <div className = "team_cards">
                            {this.showplayersByCategory('Midfield')}
                        </div>
                </div>

                <div className = "team_category_wrapper">
                        <div className = "title">Strikers</div>
                        <div className = "team_cards">
                            {this.showplayersByCategory('Striker')}
                        </div>
                </div>
            
           
                   
            </div>
         
         
        );
    }
}

export default Team;