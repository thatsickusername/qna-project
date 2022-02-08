import React from 'react';
import moment from 'moment'
import { useHistory } from 'react-router';

function Followinguser({followers}) {

    const history = useHistory()

    return (
        <div className="PostInputContainer">
            <div className="LikedUsersContainer ">
                <h3 className="LikedUserTitle">Users that follow</h3>
                <div className="LikedUserBox">
                    {followers.length===0?
                        <div className="LikedUser"><h4 className="LikedName">Be the first one to follow</h4></div>:
                        followers.map((follow)=>{
                            return (
                                <div className="LikedUser" key={follow.username}>
                                <h4 className="LikedName" onClick={()=> {history.push(`../profile/${follow.username}`)}}>@{follow.username}</h4>
                                <h4 className="LikedName">followed {moment(follow.createdAt).fromNow()}</h4>
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

export default Followinguser;