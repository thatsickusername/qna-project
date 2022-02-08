import React,{useState, useEffect} from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function FollowSection({getUser}) {

    const {user} = useContext(AuthContext)

    const [FollowUser, setFollowUser] = useState(false)

    useEffect(()=>{
        if(getUser.followers.find(follow => follow.username === user.username)){
            setFollowUser(true)
        }else{
            setFollowUser(false)
        }
    },[getUser,user])
    

    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {userId: getUser.id}
    })

    return (

        <div className="FollowContainer">
            <div className="FollowBox">
                <h3>{getUser.followers.length}</h3>
                <h3 className="FollowText">followers</h3>
            </div>
            {getUser.username===user.username?
                <div></div>
                :
                <button className={FollowUser?"FollowedButton":"FollowButton"} onClick={()=>{
                    followUser()
                    setFollowUser(!FollowUser)
                    }}>{FollowUser?"Followed":"Follow"}
                </button>
            }
        </div>
    );
}

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($userId: ID!){
        followUser(userId: $userId){
            id
            followers{
                id
                createdAt
                username
            }
        }
    }
`

export default FollowSection;