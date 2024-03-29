import React from 'react';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import './sign-up.styles.scss';


class SignUp extends React.Component{

    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("passwords don't match")
            return;
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch(error){
            console.error(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name]:value})
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;

        return(
            <div className=''>
                <h2>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        name='displayName'
                        type='text'
                        handleChange={this.handleChange}
                        label='Display Name'
                        value={displayName}
                        required
                    />
                    <FormInput
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        label='Email'
                        value={email}
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>Sign up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;