import React from 'react'

import Post from './Post/Post'
import './Posts.css'

const Posts = (props) => {
    return (
        <div className="posts">
            {props.posts ? props.posts.map(post => <Post personal={props.personal} key={post._id} post={post}/>):null}
        </div>
    )
}

export default Posts;