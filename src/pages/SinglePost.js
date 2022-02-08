import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import Post from './Post';
import '../Css/SinglePost.css'
import LikedUsers from './LikedUsers';
import moment from 'moment'
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';



function SinglePost(props) {

    const postId = props.match.params.postId

    const {user} = useContext(AuthContext)
    const [comment, setComment] = useState('')
    
    const {data: {getPost} = {}}= useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){},
        variables:{
            postId,
            body:comment
        }
    })

    function deletePostCallback(){
        setComment('')
    }

    let postMarkup

    if(!getPost){
        postMarkup = (
            <div className="PostMarkup">
                <p>loading...</p>
            </div>
        )
    }else{

        const {id, comments} = getPost

        postMarkup = (
            <div className="PostMarkup">

                <Post post={getPost}/>

            <div className="CommentsCard">
                <div className="CreateCommentContainer">
                    <form>
                        <textarea className="CommentInput" type="text" placeholder="Reply to the post" name="comment" value={comment} onChange={event => setComment(event.target.value)}/>
                        <button className="CommentButton" type="submit" disabled={comment.trim()===''} 
                            onClick={(event)=>{event.preventDefault()
                                submitComment(!comment)
                                setComment('')}}>SUBMIT</button>
                    </form>
                </div>

                
                    {comments.length > 0 ? 
                        comments.map(comment => 
                            (<div className="CommentContainer " key={comment.id}>
                                {
                                    user.username === comment.username && 
                                    (<DeleteButton postId={id} commentId={comment.id} callback={deletePostCallback}/>)
                                }
        
                                <div className="secondRow">
                                    <h4 className="postUser">
                                        @{comment.username}
                                    </h4>
                                    <h4 className="postTime">
                                        commented {moment(comment.createdAt).fromNow()}
                                    </h4>
                                </div>
                            
                                <div className="thirdRow">
                                    <h4 className="postBody">
                                        {comment.body}
                                    </h4>
                                </div>
                                </div>
                                
                                )):
                            (<div className="CommentContainer">
                                <div className="secondRow noComment">
                                    <h4 className="postUser">Be the first to comment</h4>
                                </div>
                            </div>)    
                    }
                </div>
            </div>
        )
    }


    let likeMarkup

    if(getPost){
        const { likes } = getPost
        likeMarkup = ( <LikedUsers likes={likes}/>)
    }
    
        

    return (
        <div className="AppContainer">
            {
                (postMarkup)
            }
            {
                (likeMarkup)
            }
        </div>
    );
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId:$postId, body: $body){
            id
            comments{
                id
                username
                body
                createdAt
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id title body createdAt username likeCount
            likes{
                id
                username
                createdAt
            }
            saves{
                id
                username
                createdAt
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`

export default SinglePost;