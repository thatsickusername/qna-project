import React,{useContext} from 'react';
import { useQuery } from '@apollo/client';
import {AuthContext} from '../context/auth'
import Post from './Post';
import {FETCH_POSTS_QUERY} from '../utils/graphql'

function SavedPage() {

    const {user} = useContext(AuthContext)

    const {data: {getPosts} = {}} = useQuery(FETCH_POSTS_QUERY)

    let savePageMarkup

    if(!getPosts){
    
        savePageMarkup = (
            <div className="SavePostContainer">
                <p>loading...</p>
            </div>
        )

    }
    else{
        savePageMarkup=(
            <div className="SavePostContainer">
                <div className="UserPostsContainer">
                   {
                        getPosts.map(post => {
                        if(post.saves.find(save => save.username === user.username)){
                            return (<Post key={post.id} post={post}/>)
                        }
                        return null
                    })
                   }
                </div>
            </div>
        )
    }    

    return (
        <div className="AppContainer">
            {
                savePageMarkup
            }
        </div>
    );
}

export default SavedPage;