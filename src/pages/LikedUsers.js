import React from 'react'
import '../Css/LikedUsers.css'
import moment from 'moment'
import { useHistory } from 'react-router';

function LikedUsers({likes}) {

    const history = useHistory()

    return (
        <div className="PostInputContainer">
            <div className="LikedUsersContainer ">
            <h3 className="LikedUserTitle">Likes on post</h3>
            <div className="LikedUserBox">
                {likes.length===0?
                    <div className="LikedUser"><h4 className="LikedName">Be the first one to like this post</h4></div>:
                    likes.map((like)=>{
                        return(
                            <div className="LikedUser" key={like.username}>
                            <h4 className="LikedName" onClick={()=> {history.push(`../profile/${like.username}`)}}>@{like.username}</h4>
                            <h4 className="LikedName">liked {moment(like.createdAt).fromNow()}</h4>
                            </div>
                        )
                    }
                        
                    

                    )
                }
            </div>
            </div>
        </div>
    );
}

export default LikedUsers;