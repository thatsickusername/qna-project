import React from 'react'
import '../Css/Feed.css'
import { useQuery } from '@apollo/client/react/hooks'
import {FETCH_POSTS_QUERY} from '../utils/graphql'
import Post from './Post'


function Feed() {

    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)

    return (
        <div className="FeedContainer">
            {
                loading ? (<h1>Loading...</h1>):(posts && posts.map((post) => {
                   
                    return(
                        <div className="Post" key={post.id}>
                            <Post post={post} />
                        </div>
                    )
                    
                }))

            }
        </div>
    );
}


export default Feed;