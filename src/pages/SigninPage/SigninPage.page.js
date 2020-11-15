import React from 'react'

import firebase from 'firebase/app'

import google from './google.png'
import {Link} from 'react-router-dom'

import {debounce} from '../../App'

export default function SigninPage(props) {

  const signIn = () =>{
    firebase.auth().signInWithEmailAndPassword(document.getElementById('Sign-in-EmailInput').value,
    document.getElementById('Sign-in-PasswordInput').value).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message === 'The password is invalid or the user does not have a password.' ||
        error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'?
        'incorrect email and/or password': error.message;
      document.getElementById('sign-in-error-message').innerHTML = errorMessage
      console.log(errorMessage)
    });
  }
  const signInWithGoogle = () =>{ 
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)    
  }
  
  const [WindowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    let isMounted = true
    const debouncedHandelResize = debounce(function handlResize() {
      if(isMounted) setWindowWidth(window.innerWidth)
    },250)
    window.addEventListener('resize',debouncedHandelResize)
    return () => {
      window.removeEventListener('resize',debouncedHandelResize)
      isMounted = false
    }
  }) 

  return (
    <div style={{padding:'0px 20px'}}>
    <form className='sign' 
      style={{maxWidth:'500px',border:'solid 1px black' , padding:'30px 25px', margin:'130px auto'}}
      onSubmit={function(e){e.preventDefault();signIn()}}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input required type="email" className="form-control" id="Sign-in-EmailInput" placeholder="Enter email"/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input required type="password" className="form-control" id="Sign-in-PasswordInput" placeholder="Password"/>
      </div>  
      <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Sign in</button>
      {WindowWidth <= 630? <div> <Link to='/signup' style={{float:'right',fontSize:'18px',color:'#007aff',marginRight:'7px'}}>Sign up</Link> </div>:null}
        {WindowWidth >= 270 ?
        <div style={{textAlign:'center',margin:'30px 0px'}} >
          <span style={{borderTop:'solid black 1px',width:'36%',display:'inline-block'}}></span>
          <div style={{display:'inline'}}>&nbsp;&nbsp;or&nbsp;&nbsp;</div>
          <span style={{borderTop:'solid black 1px',width:'36%',display:'inline-block'}} ></span>
        </div>: <br/>}
        <div className="row" >
            <div className="col-md-12"> 
              <div className="btn btn-block google-btn" 
                style={{padding:'9px',fontSize:'20px',border:'solid  rgba(0, 0, 0, 0.527) 2px'}}
                onClick={signInWithGoogle} >
                <img height='25px' alt='google' src={google}/> {WindowWidth > 310 ? 'Sign in With Google' : null}
              </div>
            </div>
        </div>
      </form>
      <div id='sign-in-error-message' style={{color:'red',textAlign:'center'}}></div>
    </div>
  )
}
