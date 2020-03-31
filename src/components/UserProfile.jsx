import React, { useState } from 'react';
import { auth, firestore, storage } from '../firebase';


const UserProfile = () => {
  const [displayName, setDisplayName] = useState('')

  let imageInput = null;

  const uid = () => {
    return auth.currentUser.uid;
  }

  const userRef = () => {
    return firestore.doc(`users/${uid()}`)
  }

  const file = () => {
    //? if image input is not null get me the first file
    return imageInput && imageInput.files[0]
  }

  const handleDisplayName = (e) => {
    setDisplayName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (displayName) {
      userRef().update({
        displayName: displayName
      })
    }

    if (file()) {
      storage
        .ref()
        .child('user-profiles')
        .child(uid())
        .child(file().name)
        .put(file())
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => userRef().update({
          photoURL: photoURL
        }))
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={displayName}
        name='displayName'
        onChange={handleDisplayName}
        placeholder='display name' />

      <input type='file' ref={ref => imageInput = ref} />
      <input type='submit' />
    </form>
  )
}

export default UserProfile;