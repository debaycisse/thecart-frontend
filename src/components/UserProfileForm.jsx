import { Component } from "react";
import { useNavigate } from "react-router-dom";


class UserProfileForm extends Component {

    constructor (props){
        super(props);

        this.state ={
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            role: '',
            phone: '',
            password1: '',
            password2: ''
        }
    }

    // custom methods to handle state change of the controls
    handleFirstNameChange = (event) => {
        this.setState({first_name: event.target.value});
    }

    handleLastNameChange = (event) => {
        this.setState({last_name: event.target.value});
    }

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePhoneChange = (event) => {
        this.setState({phone: event.target.value});
    }

    handleRoleChange = (event) => {
        this.setState({role: event.target.value});
    }

    handlePassword1Change = (event) => {
        this.setState({password1: event.target.value});
    }

     handlePassword2Change = (event) => {
        this.setState({password1: event.target.value});
    }

    handleFormSubmission = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/api/v1/auth/register/',
        {
            'method': 'POST',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify(this.state)
        })
        .then(response => {
            if (response.ok){
                useNavigate.push('/');
            } else {
                throw new Error(`Error occurd while submitting a form : ->>  ${response.statusText}`);
            }
        })
    }
    
    
    render() {
        return (
            <form method="POST" className="mt-8" onSubmit={this.handleFormSubmission}>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" id="first_name" 
                className="border-2 block mb-4" 
                onChange={this.handleFirstNameChange} />

                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" id="last_name"
                className="border-2 block mb-4"
                onChange={this.handleLastNameChange} />          

                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"
                className="border-2 block mb-4"
                onChange={this.handleUsernameChange} />

                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" id="email"
                className="border-2 block mb-4"
                onChange={this.handleEmailChange} />          

                <label htmlFor="phone_number">Phone Number</label>
                <input type="text" name="phone_number" id="phone_number"
                className="border-2 block mb-4"
                onChange={this.handlePhoneChange} />

                <label htmlFor="role">Role</label>
                <select className="border-2 block mb-4" name="role" id="role" onChange={this.handleRoleChange}>
                    <option selected value="--">---</option>
                    <option value="regular">Regular</option>
                </select>

                <label htmlFor="password">Paswword</label>
                <input className="border-2 block mb-4" type="password"
                name="password" id="password"
                onChange={this.handlePassword1Change}/>


                <label htmlFor="password2">Confirm Paswword</label>
                <input className="border-2 block mb-4" type="password"
                name="password2" id="password2"
                onChange={this.handlePassword2Change} />
                
                <input className="rounded-sm py-1 px-3 hover:cursor-pointer bg-slate-400" type="submit" value="Sign Up" />

            </form>
        );
    }
}

export default UserProfileForm;