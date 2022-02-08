import React, {useState} from 'react';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'
import '../Css/TweetBox.css'
import{FETCH_POSTS_QUERY} from '../utils/graphql'

function TweetBox() {

    const [values, setValue] = useState({
        title: '',
        body: ''
    })
    

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        update(proxy,result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            let newData = [...data.getPosts]
            newData = [result.data.createPost, ...newData]

            proxy.writeQuery({query: FETCH_POSTS_QUERY,
            data:{
                ...data,
                getPosts:{
                    newData
                }
            }})

            setValue({
                title: '',
                body: ''
            })

        },
        variables: values,
    })

    const onChange = (e)=>{
        setValue({ ...values, [e.target.name]: e.target.value})
        
    }

    const onSubmit=(e)=>{
        if(values.body===''){
            e.preventDefault()
            return(<div>nothing</div>)
        }
        e.preventDefault()
        createPost()
        
    }

    return (
        <div className="QuestionBoxContainer">
            <form className="QuestionBox" onSubmit={onSubmit}>  
                <textarea placeholder="Create a post" className="titleArea" name="title" type="text" value={values.title} onChange={onChange}></textarea>
                <textarea placeholder="Share what's on your mind" className="bodyArea" name="body" type="text" value={values.body} onChange={onChange}></textarea>
                <button className={values.body==='' ? "disabledButton" : "TweetButton"} type="submit"> Post </button>
            </form>      
        </div>

    );
}

const CREATE_POST_MUTATION = gql`
mutation createPost($title:String! $body: String!){
    createPost( title: $title, body: $body ){
        id title body createdAt username 
        likes{
            id username createdAt
        }
        likeCount
        comments{
            id body username createdAt
        }
        commentCount
    }
}
`

export default TweetBox;

