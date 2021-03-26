import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Post from './components/Post';
import { db, auth } from './firebase';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;
  
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  }
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() =>{
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions, before you fire the useEffect
      unsubcribe();
    }

  }, [user, username]);

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

  const signUp = (e) => {
    // only in forms
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message))
    setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://www.prnewsonline.com/Assets/Image/Instagram_Logo_Large.png"
                alt="logo"
              />
            </center>
            <Input 
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://www.prnewsonline.com/Assets/Image/Instagram_Logo_Large.png"
                alt="logo"
              />
            </center>
            <Input 
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://cdn.freelogovectors.net/wp-content/uploads/2016/12/InstagramLogo.png"
          alt="logo"
        />
      </div>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}


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
