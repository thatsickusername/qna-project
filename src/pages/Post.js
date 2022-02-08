import React, {useState, useContext} from 'react';
import '../Css/Post.css'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import {AuthContext} from '../context/auth'
import LikeButton from '../shared/LikeButton';
import DeleteButton from './DeleteButton';
import SaveButton from '../shared/SaveButton';



function Post({ post:{ id, likes, body, username,saves, likeCount, commentCount, createdAt, title}}) {

    const history = useHistory()

    const {user} = useContext(AuthContext)

    const [postDelete, setPostDelete] = useState(false)
    const [ModalOpen, setModalOpen] = useState(false)

    function deletePostCallback(){
        setPostDelete(true)
    }

    return (
        <div className={postDelete?"PostContainerDeleted": "PostContainer"}>


            <div className={ModalOpen?"ModalOpen":"ModalClosed"}>
                <div className="ModalContainer">
                    
                        <h3 className="shareTitle">Share</h3>
                        <h4 className="postTime">Link to the post:</h4>
                        <span onClick={()=>{history.push(`/posts/${id}`)}}>https://mycollagespace.netlify.app/posts/{id}</span>
                    
                    <button className="CloseModalButton" onClick={()=>{setModalOpen(false)}}>Close</button>
                </div>     
            </div>
            

            <div className="firstRow">
                <h3 className="postTitle">
                    {title}
                </h3>
            </div>

            <div className="secondRow">
                <h4 className="postUser" onClick={()=> {history.push(`../profile/${username}`)}}>
                    @{username}
                </h4>
                <h4 className="postTime">
                    posted {moment(createdAt).fromNow()}
                </h4>
            </div>

            <div className="thirdRow">
                <h4 className="postBody">
                    {body}
                </h4>
            </div>

            <div className="fourthRow">

                <LikeButton post={{id, likes, likeCount}} user={user}/>

                <div className="commentButton">
                    <div className="IconContainer" >
                        <svg onClick={ ()=>{
                            history.push(`/posts/${id}`)              
                            }}
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.124 12.1136L5.12669 12.1264C5.50897 13.9413 6.73214 15.4995 8.46323 16.2864L12 17.894V16H14C16.7614 16 19 13.7614 19 11V10C19 7.23858 16.7614 5 14 5H10C7.23858 5 5 7.23858 5 10V11C5 11.3804 5.04211 11.7485 5.12115 12.1009L5.124 12.1136ZM14 21L7.63562 18.1071C5.31787 17.0536 3.68127 14.9677 3.16963 12.5386C3.05859 12.0435 3 11.5286 3 11V10C3 6.13401 6.13401 3 10 3H14C17.866 3 21 6.13401 21 10V11C21 14.866 17.866 18 14 18V21Z" fill="#627481"/>

                        </svg>
                        <h3>{commentCount}</h3>
                    </div>
                </div>
                <div className="shareButton">
                    <div className="IconContainer" >
                            <svg 
                                onClick={()=>{setModalOpen(true)}}
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.001 20H6.00098C4.89641 20 4.00098 19.1046 4.00098 18V7C4.00098 5.89543 4.89641 5 6.00098 5H10.001V7H6.00098V18H17.001V14H19.001V18C19.001 19.1046 18.1055 20 17.001 20ZM11.701 13.707L10.291 12.293L16.584 6H13.001V4H20.001V11H18.001V7.415L11.701 13.707Z" fill="#627481"/>
                            </svg>
                    </div>
                </div>
                <SaveButton post={{id,saves, username}} user={user}/>
                
            </div>
            {user.username === username && 
                (<DeleteButton postId={id} callback={deletePostCallback}/>)
            }
            
        </div>
    );
}

export default Post;