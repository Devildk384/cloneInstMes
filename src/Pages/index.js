import React , {useEffect,useState}from 'react';
import './index.css';
import Post from '../Post';
import { db ,auth } from "../firebase";
import { makeStyles} from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import { Button, Input } from '@material-ui/core';
import ImageUpload from '../ImageUpload';
import { Link } from 'react-router-dom';
 

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  

 const MainPage = () =>{
  const classes =useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts,setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn , setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {

    
    if (authUser) {

      console.log(authUser);
      setUser(authUser);
      
    }else{
      setUser(null);
    }
  })

  return () => {
    unsubscribe();
  }
    
  }, [user, username]);

useEffect(() => {
  db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id:doc.id,
      post: doc.data()

    })));
  })
 
}, [] );

const signUp = (event) => { 
  event.preventDefault();

  auth.createUserWithEmailAndPassword(email, password)
  .then((authUser) =>{
   return authUser.user.updateProfile({
     displayName: username
    })
  })
  .catch((error) => alert(error.message));
  setOpen(false);
}

const signIn = (event) => { 
  event.preventDefault();

  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false);
}

  
    return (
        <div className="app">


    

     
      <Modal
        open={open}
        onClose={() => setOpen(false)}
       >
      
      <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
          <img className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""

          />
          </center>

          <Input 
             placeholder="username"
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             />
                <Input 
             placeholder="email"
             type="text"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
               <Input 
             placeholder="password"
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             />
            
             <Button type="submit" onClick={signUp}> Signup</Button>
            
          
        
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
          <img className="app__headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""

          />
          </center>

         
                <Input 
             placeholder="email"
             type="text"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             />
               <Input 
             placeholder="password"
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             />
            
             <Button type="submit" onClick={signIn}>SignIn</Button>
            
          
        
      </form>
     
    </div>


    
      </Modal>


     <div className="app__header">

     <img className="app__headerImage" 
       src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
       alt=""
     />

{
        user? 


        ( 
          <div className="app__loginContainer">
          
          <Button onClick={() => setOpenSignIn(true)} >Signut</Button> 
          <Link to={{pathname:"/MessageShow", state: user
          }}>
            <Button >Message</Button> 
          </Link>
          
         
          </div>

          ):

        (
          <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)} >SignIn</Button> 
          <Button onClick={() => setOpen(true)} >SignUp</Button> 


          </div>
          
        )
      }
      
 
     </div>

     <div className="app__posts">
     <div className="app__postsLeft">
     {
       posts.map(({id ,post}) => (
         <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} />
       ))
     }

     </div>
     {/* <div className="app__postsRight">
     <InstagramEmbed
     url="https://www.instagram.com/p/CCrBLR6h0Al/?utm_source=ig_web_copy_link"
     maxWidth={320}
     hideCaption={false}
     containerTagName="div"
     protocol=""s
     injectScript
     onLoading={() => {}}
     onSuccess={() =>{}}
     onAfterRender={() =>{}}
     onFailure={() =>{}}

     />
      <InstagramEmbed
     url="https://www.instagram.com/p/B-4GsPrpr_z/?utm_source=ig_web_copy_link"
     maxWidth={320}
     hideCaption={false}
     containerTagName="div"
     protocol=""
     injectScript
     onLoading={() => {}}
     onSuccess={() =>{}}
     onAfterRender={() =>{}}
     onFailure={() =>{}}

     />

     </div> */}


     </div>

    
    
    
    
   
     {user?.displayName ? (
        <ImageUpload username={user.displayName} />

      ):(
        <h3>Sorry you need to login to upload</h3>
      )}

    </div>
    );
}

export default MainPage;
