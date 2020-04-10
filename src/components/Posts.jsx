import React, { useContext } from 'react';
import AddPost from './AddPost';
import Post from './Post';
import { PostsContext } from '../providers/PostsProvider'



export default function Posts() {
  const posts = useContext(PostsContext)

  const sortedPosts = posts.sort((a, b) => {
    return b.createdAt.seconds - a.createdAt.seconds;
  })

  return (

    <div>

      <AddPost />
      {
        sortedPosts.map(post => <Post {...post} key={post.id} />)
      }
    </div>



  )
}
