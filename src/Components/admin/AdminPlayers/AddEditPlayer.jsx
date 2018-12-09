import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebasePlayers , firebaseDB, firebaseMatches,firebase } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import Fileuploader from '../../ui/Fileuploader';



class AddEditPlayer extends Component {
    state = {
        playerId: '',
        formType: '',
        formError: '',
        formSuccess:'',
        defaultImg:'',
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label:'Player First Name',
                    name: 'name_input',
                    type:'text'
                },
                validation:{
                    required:true
                },
                valid:false,
                validationMessage:'',
                showlabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config:{
                    label:'Player Last Name',
                    name: 'lastname_input',
                    type:'text'
                },
                validation:{
                    required:true
                },
                valid:false,
                validationMessage:'',
                showlabel: true
            },
            number: {
                element: 'input',
                value: '',
                config:{
                    label:'Player Number',
                    name: 'number_input',
                    type:'text'
                },
                validation:{
                    required:true
                },
                valid:false,
                validationMessage:'',
                showlabel: true
            },
            position: {
                element: 'select',
                value: '',
                config:{
                    label:'Player Position',
                    name: 'position_select',
                    type:'select',
                    options:[
                        {key: "Keeper" , value: "Keeper" },
                        {key: "Defence" , value: "Defence" },
                        {key: "Midfield" , value: "Midfield" },
                        {key: "Striker" , value: "Striker" }
                    ]
                },
                validation:{
                    required:true
                },
                valid:false,
                validationMessage:'',
                showlabel: true
            },
            image:{
                element:'image',
                value: '',
                validation:{
                    required:true
                },
                valid:false
            }
        }
    }


    updateFields = (playerData,playerId,formType,defaultImg) =>{
        const formdata = {...this.state.formdata};
        for (let key in formdata ){
            formdata[key].value  = playerData[key];
            formdata[key].valid = true;
        }
        this.setState({
            formdata,
            formType,
            defaultImg,
            playerId
        });
        
    }
    componentDidMount() {
        const playerId = this.props.match.params.id;
        if(!playerId){
            this.setState({
                formType: 'Add player'
            });
        }
        else{
           
            firebaseDB.ref(`players/${playerId}`).once('value')
                .then( snapshot =>{
                    const playerData = snapshot.val();
                    firebase.storage().ref('players')
                        .child(playerData.image).getDownloadURL()
                        .then(url => {
                            this.updateFields(playerData,playerId,'Edit player',url);
                        })
                        .catch( e =>{
                            this.updateFields({...playerData,image:''},playerId,'Edit player','');  
                        })
                }) 
        }
    }
    
    
    updateForm(element, content = ''){
        
        // ex. element.id is name, lastname ,position, etc
        const newFormdata = {...this.state.formdata}
        const newElement = { ...newFormdata[element.id]}

        if(content === ''){
            newElement.value = element.event.target.value;
        }
        else{
            newElement.value = content;
        }
        

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }


    successForm = (successMessage)=> {
        this.setState({formSuccess:successMessage});
        setTimeout(()=>{
            this.setState({formSuccess:''});
            this.props.history.push('/admin_players');
        },1000);
    }
    submitForm(event){
        event.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }



        if(formIsValid){
                
                if(this.state.formType === 'Edit player'){
                    console.log(dataToSubmit);
                    // perform an update in firebase.
                    firebaseDB.ref(`players/${this.state.playerId}`)
                        .update(dataToSubmit)
                        .then( ()=>{
                            this.successForm('Updated Correctly');
                        })
                        .catch( err =>{
                            this.setState({formError:true})
                        })
                } 
                else {
                    firebasePlayers.push(dataToSubmit).then(()=>{
                        this.props.history.push('/admin_players');
                    }).catch((e)=>{
                        this.setState({ formError: true })
                    })
                }
        } 
        else {
            this.setState({
                formError: true
            })
        }
    }
    resetImage = ()=>{
       const formdata = {...this.state.formdata};
       formdata['image'].value = '';
       formdata['image'].valid = false;
       this.setState({formdata,defaultImg:''});
    }

    storeFileName = (f) =>{
        console.log('yodate the form');
        this.updateForm({id:'image'},f)
    }

    render() {
        console.log(this.state.formdata);
        return (
            <AdminLayout>
                <div className = "editplayers_dialog_wrapper">
                    <h2> {this.state.formType} </h2>
                    <form onSubmit = { (e)=>this.submitForm(e) } >

                              <Fileuploader
                                  dir = "players"  // to players directory
                                  tag = {"Player Image"}
                                  defaultImg =  {this.state.defaultImg}
                                  defaultImgName = {this.state.formdata.value}
                                  resetImage = {()=> this.resetImage() }
                                  filename = { (f)=> this.storeFileName(f) }

                              />

                               <FormField
                                    id={'name'}
                                    formdata={this.state.formdata.name}
                                    change={(element)=> this.updateForm(element)}
                                />
                                 <FormField
                                    id={'lastname'}
                                    formdata={this.state.formdata.lastname}
                                    change={(element)=> this.updateForm(element)}
                                />
                                 <FormField
                                    id={'number'}
                                    formdata={this.state.formdata.number}
                                    change={(element)=> this.updateForm(element)}
                                />
                                  <FormField
                                    id={'position'}
                                    formdata={this.state.formdata.position}
                                    change={(element)=> this.updateForm(element)}
                                />

                            <button>Save Changes</button>

                        <div className = "success_label"> {this.state.formSuccess}</div>
                            { 
                                this.state.formError ?
                                <div className = "error_label">
                                    Something is Wrong
                                </div>
                                : ''
                            }
                    
                            
                    </form>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditPlayer;