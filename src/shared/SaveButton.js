import React,{useState, useEffect} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client'

function SaveButton({post:{id,saves}, user}) {

    const [SavePost, setSavePost] = useState(false)

    useEffect(()=>{
        if(saves.find(save => save.username === user.username)){
            setSavePost(true)
        }else{
            setSavePost(false)
        }
    },[user, saves])

    

    const [savePost] = useMutation(SAVE_POST_MUTATION, {
        variables: {postId: id}
    })


    return (
        <div className="saveButton">
           <div className="IconContainer" >
           <svg onClick={ ()=>{
                   savePost()  
                   setSavePost(!SavePost)              
                   }}
                   width="24" 
                   height="24" 
                   viewBox="0 0 24 24" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg">
                   <path 
                       d={
                           SavePost ? 
                           "M5.00005 21L5.00005 5.18182C5.00004 3.98108 5.89065 3.006 6.99288 3L17.0071 3C18.1093 3.006 18.9999 3.98108 18.9999 5.18182L18.9999 21C19.0099 21 17.5078 21 17.0071 21L12 17.7273L6.99288 21C6.49217 21 4.99004 21 5.00005 21Z":
                           "M5.00005 21L5.00005 5.18182C5.00004 3.98108 5.89065 3.006 6.99288 3L17.0071 3C18.1093 3.006 18.9999 3.98108 18.9999 5.18182L18.9999 21C19.0099 21 17.5078 21 17.0071 21L12 17.7273L6.99288 21C6.49217 21 4.99004 21 5.00005 21ZM17.0071 5.18182L6.99288 5.18182L6.99288 18.8182L12 15.5455L17.0071 18.8182L17.0071 5.1818"   
                       }

                       fill={SavePost? "#006eff": "#627481"}/>
               </svg>
           </div>
       </div> 
    ) 
}


const SAVE_POST_MUTATION = gql`
    mutation savePost($postId: ID!){
        savePost(postId: $postId){
            id
            saves{
                username
            }
        }
    }
`

export default SaveButton;