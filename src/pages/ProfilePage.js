import React from 'react';
import '../Css/ProfilePage.css'
import FollowingUser from './FollowingUser';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import moment from 'moment'
import Post from './Post';

import {FETCH_POSTS_QUERY} from '../utils/graphql'
import FollowSection from './FollowSection';


function ProfilePage(props) {

    const username = props.match.params.username


    const { data: { getUser } = {} } = useQuery(FETCH_USER_QUERY,{
        variables: {
            username
        }
    })

    const {data: {getPosts} = {}} = useQuery(FETCH_POSTS_QUERY)


    let ProfileMarkup

    if(!getUser){
    
        ProfileMarkup = (
            <div className="PostMarkup">
                <p>loading...</p>
            </div>
        )

    }
    else{

        ProfileMarkup = (
            <div className="ProfileContainer">
                <div className="UserInfoContainer">
                    <h1>{getUser.username}</h1>
                    <h3>Email: {getUser.email}</h3>
                    <h3>Joined LOGO: {moment(getUser.createdAt).fromNow()}</h3>
                    <FollowSection getUser={getUser} />
                </div>
                
                    
               
                <div className="UserPostsContainer">
                    <div className="UserPostsTitle">Posts made by {getUser.username}</div>
                   {
                       getPosts && getPosts.map(post => {
                        if(post.username===getUser.username){
                            return (<Post key={post.id} post={post}/>)
                        }
                        return null
                    })
                   }
                </div>
            </div>
        )
    }

    let FollowMarkup

    if(getUser){
        const { followers } = getUser
        FollowMarkup = ( <FollowingUser followers={followers}/>)
    }
   

    return (
        <div className="AppContainer">
            {
                ProfileMarkup
            }
           {
               FollowMarkup
           }
        </div>
    );
}


export const FETCH_USER_QUERY = gql`
query($username: String!){
    getUser(username:$username){
        id
        username
        email
        createdAt
        followers{
            createdAt
            username
        }
    }
}
`

export default ProfilePage;

