import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([]);
  return (
    <div className="App">
      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.prnewsonline.com/Assets/Image/Instagram_Logo_Large.png"
          alt="logo"
        />
      </div>
      <Post 
        username = "estelo2jz"
        caption = "WOW it works"
        imageUrl = "https://images.pexels.com/photos/1049622/pexels-photo-1049622.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
      />
      <Post 
        username = "mike005"
        caption = "nice day at the beach"
        imageUrl = "https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
      <Post 
        username = "isabelaaa"
        caption = "making food for my dog"
        imageUrl = "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />

    </div>
  );
}

export default App;
