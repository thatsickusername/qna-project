import { gql } from 'graphql-tag';
import React, {useContext, useState} from 'react';

import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth'

function Login() {

    const context = useContext(AuthContext)

    const history = useHistory()
    const [ errors, setErrors] = useState({})

    const [values, setValue] = useState({
        username: '',
        password: '',
    })

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, {data: {login: userData}}){
            context.login(userData)
            history.push('/home')
        },
        onError(err){
            setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.errors : {})
            
        },
        variables: values
    })

    const onChange = (e)=>{
        setValue({ ...values, [e.target.name]: e.target.value})
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        loginUser()
        
    }

    

    return (
        <div className="RegisterContainer">
            <form onSubmit={onSubmit} noValidate className={loading? "Loading":"Form"}>
                <h1>{loading? "Loading":"LOGIN"}</h1>

                <input 
                    placeholder="Username" 
                    type="text"
                    name="username" 
                    
                    value={values.username} 
                    onChange={onChange}>
                </input>
                
                <input 
                    placeholder="Password" 
                    type="password"
                    name="password" 
                    value={values.password} 
                    onChange={onChange}>
                </input>
                
                <button type="submit">Login</button>
                    {
                        Object.keys(errors).length > 0 && (
                            <div className="errorMessage">
                                <ul className="list">
                                    {
                                        Object.values(errors).map(value=>(
                                            <li key={value}>{value}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
            </form>
                    
            
        </div>
    );}


    const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username password: $password
        ){
            id
            email
            username
            token
            createdAt

        }
            
        }
`

export default Login;