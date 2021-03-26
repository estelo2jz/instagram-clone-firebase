import React, { useState } from 'react'
import firebase from 'firebase';
import { Button, Input } from '@material-ui/core';
import { db, storage } from '../firebase';

import '../styles/ImageUploads.scss';

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    // for example, i choose file, it will pick the first one that you choose even tho you choose multiple
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = () => {
    // basiclly saying, access the storage in firebase get a reference to this photo, image.name is the file name we selected.
    // and put it in the ${image} variable
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    
    uploadTask.on(
      // on state_changed give a snapshot
      "state_changed", 
      // we can track it and tell the user how long is it gonna take to finish.
      (snapshot) => {
        // progress function
        // this eqaution rigth here, 
        // is gonna work out between 0 and 100 and will give a progress indicator from 0 to 100.
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      }, 
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function
        storage
          // this has the reference to the images in line 20, which we got acces to the storage
          .ref("images")
          // go to the image name "child", and get me the download url.
          .child(image.name)
          .getDownloadURL()
          // then do some stuff with that url
          .then(url => {
            // post image inside db
            db.collection("posts").add({
              // allow us to sort the timings of of posts
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            })
            // after the image is done loading and reset all input to blank
            setProgress(0);
            setCaption("");
            setImage(null);
          })
      }
    )
  }

  return (
    <div>
      image uploader
      {/* I want to have.... */}
      {/* Caption input */}
      {/* File picker */}
      {/* Post button */}
      <progress value={progress} max="100" />
      <input 
        type="text" 
        placeholder="Enter a caption..."
        onChange={event => setCaption(event.target.value)}
        value={caption}  
      />
      <input 
        type="file"
        onChange={handleChange}
      />
      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}

export default ImageUpload
