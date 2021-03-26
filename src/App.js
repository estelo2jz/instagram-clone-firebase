import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Post from './components/Post';
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([
    // {
    //   username: "isabelaaa",
    //   caption: "making food for my dog",
    //   imageUrl: "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    // },
    // {
    //   username: "mike005",
    //   caption: "nice day at the beac",
    //   imageUrl: "https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    // },
    // {
    //   username: "estelo2jz",
    //   caption: "crusing the daily",
    //   imageUrl: "https://images.pexels.com/photos/1049622/pexels-photo-1049622.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    // },
  ]);

  // useEffect -> Runs a piece of code base on a specific condition
  useEffect(() => {
    // this is where the code runs
    // run the when the code refreshes
    db.collection('posts').onSnapshot(snapshot => {
      // every time a new post it added, this code fires
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.prnewsonline.com/Assets/Image/Instagram_Logo_Large.png"
          alt="logo"
        />
      </div>

      {
        posts.map(({id, post}) => (
          <Post 
            key = {id}
            username = {post.username}
            caption = {post.caption}
            imageUrl = {post.imageUrl}
          />
        ))
      }

    </div>
  );
}

export default App;
