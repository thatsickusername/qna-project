import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import '../Css/Post.css'

function DeleteButton({postId, commentId, callback}) {

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
        
        const [deletePostOrComment] = useMutation(mutation, {
            update(){
                
                if(callback){
                    callback()
                }
            },
            variables: {
                postId,
                commentId
            }
        })


    return (

            <div className="deleteButton">
                <svg onClick={deletePostOrComment}
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9Z" 
                          fill="#ff0000"/>
                </svg>
            </div>

            
        
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId:$postId, commentId: $commentId){
            id
            comments{
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton;