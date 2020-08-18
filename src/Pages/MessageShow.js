import React, { useState,useEffect } from 'react';
import { Input, FormControl} from '@material-ui/core';
import firebase from 'firebase';
import Message from '../Message';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core';



import './MessageShow.css';
import {db} from '../firebase';

function MessageShow(props) {
  console.log(props);
  const [input, setInput] =useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');


  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message:doc.data()})))
    });
  }, [])

  useEffect(() => {
    setUsername(prompt('Please Enter your name'));
  }, [])



  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message:input,
      username: username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setInput('');

  }

  return (
    <div className="App">
    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/SeXJIAlf_z-.png"/>
     <h1>this is the Messenger App!</h1>
     <h1>Welcome {username}</h1>



     <form className="app__form">
     <FormControl className="app__formControl">
      
     <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value) }/>

     <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
      <SendIcon/>
     </IconButton>
     
     </FormControl>
      </form>
      
      <FlipMove>
     { messages.map(({id,message})=> (
      <Message key={id} username={username} message={message} />
     ))}
     </FlipMove>

    
    </div>
  
    ); 

}

export default MessageShow;
