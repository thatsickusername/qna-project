import React from 'react';
import App from './App';
import { ApolloClient } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'
import { createHttpLink } from '@apollo/client/link/http'
import { ApolloProvider } from '@apollo/client/react/context'
import {setContext} from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})



const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken')
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),

    cache: new InMemoryCache({
        typePolicies: {

            Query:{
                fields:{
                    getPosts:{
                        merge: false
                    }
                }
            },

            Post: {
              fields: {
                  comments:{
                      merge: false
                  },
                likes: {
                  merge: false,
                },
                saves:{
                    merge:false,
                }
              },
            },
            User: {
                fields: {
                    followers:{
                        merge: false
                    },
                },
              },
          }
    })
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
