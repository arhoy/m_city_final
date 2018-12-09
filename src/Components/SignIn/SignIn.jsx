import React, { Component } from 'react';
import FormField from '../ui/formFields';
import {validate} from '../ui/misc';
import {firebase} from '../../firebase';

class SignIn extends Component {
    state = {
        formError:false,
        formSuccess:'',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:''
            }
        }
    }
    updateForm(element){
        const formdata = {...this.state.formdata}
        const newElement = { ...formdata[element.id]}

        newElement.value = element.event.target.value;

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        formdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata
        })
    }


    submitFormHandler(event){
        const {email,password} = this.state.formdata;
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            console.log(email,password)
                firebase.auth().signInWithEmailAndPassword(
                    email.value,
                    password.value
                )
                .then( (data)=>{
                    console.log("login successful");
                    this.props.history.push('/dashboard');
                })
                .catch(error=>{
                    this.setState({formError:true})
                    console.log('login failed, incorrect username or password');
                })
        } 
        else {
            this.setState({formError: true}) 
            console.log('fack me error') 
        }
    }

    render() {
        const {email,password} = this.state.formdata;
     
        return (
            <div className = "container">
                <div className = "signin_wrapper">
                    <form onSubmit = {(event)=> this.submitFormHandler(event) } > 
                        <h2>Please Login</h2>
                        <FormField
                                id={'email'}
                                formdata={email}
                                change={(element)=> this.updateForm(element)}
                        />
                          <FormField
                                id={'password'}
                                formdata={password}
                                change={(element)=> this.updateForm(element)}
                        />
                        { this.state.formError ? 
                            <div className="error_label">Something is wrong, try again.</div>
                            :null
                        }
                    <button>Sign In</button>
                    </form>
                        
    
                </div>
            </div>
        );
    }
}

export default SignIn;