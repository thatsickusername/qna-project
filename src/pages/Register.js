import { gql } from 'graphql-tag';
import React, {useContext, useState} from 'react';

import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom';

import '../Css/Register.css'
import { AuthContext } from '../context/auth';

function Register() {
    const context = useContext(AuthContext)

    const history = useHistory()
    const [ errors, setErrors] = useState({})

    const [values, setValue] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email:''
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}){
            context.login(userData)
            history.push('/home')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors)
            
        },
        variables: values
    })

    const onChange = (e)=>{
        setValue({ ...values, [e.target.name]: e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        addUser()
        
    }

    

    return (
        <div className="RegisterContainer">
            <form onSubmit={onSubmit} noValidate className={loading? "Loading":"Form"}>
                <h1>{loading? "Loading":"REGISTER"}</h1>

                <input 
                    placeholder="Username" 
                    type="text"
                    name="username" 
                    
                    value={values.username} 
                    onChange={onChange}>
                </input>
                <input 
                    placeholder="Email" 
                    type="email"
                    name="email" 
                    value={values.email} 
                    onChange={onChange}>
                </input>
                <input 
                    placeholder="Password" 
                    type="password"
                    name="password" 
                    value={values.password} 
                    onChange={onChange}>
                </input>
                <input 
                    placeholder="Confirm Password" 
                    type="password"
                    name="confirmPassword" 
                    value={values.confirmPassword} 
                    onChange={onChange}>
                </input>
                <button type="submit">Register</button>
                    {
                        Object.keys(errors).length > 0 && (
                            <div className="errorMessage">
                                <ul className="list">
                                    {
                                        Object.values(errors).map(value=>(
                                            <h5 key={value}>{value}</h5>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
            </form>
                    
            
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!

    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;