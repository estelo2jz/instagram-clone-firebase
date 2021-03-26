import React from 'react';

import '../styles/Post.scss';
import Avatar from '@material-ui/core/Avatar';

function Post({ imageUrl, username, caption }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar 
          className="post__avatar"
          alt="estelo2jz"
          src="https://estelo.net/static/media/me.a4dafb17.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img 
        className="post__image"
        src={imageUrl}
        alt="username-logo"
      />
      <h4 className="post__text"><strong>{username}</strong>
        {caption}
      </h4>
    </div>
  )
}

export default Post
