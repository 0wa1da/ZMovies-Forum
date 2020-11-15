import React,{useState} from 'react'
import { Link } from 'react-router-dom'

import firebase from 'firebase/app'

import {debounce} from '../../App'

export default function SignupPage() {

  const [CheckBox, setCheckBox] = useState(false)

  function signUp(e){
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(document.getElementById('Sign-up-EmailInput').value,
      document.getElementById('Sign-up-PasswordInput').value).catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('sign-up-error-message').innerHTML = errorMessage
        console.log(errorMessage)
      
    })
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
        onSubmit={signUp} >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input required type="email" className="form-control" id="Sign-up-EmailInput" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input required type="password" className="form-control" id="Sign-up-PasswordInput" placeholder="Password" />
        </div> 
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="policy" style={{marginTop:'12px'}} 
           onChange={() => setCheckBox(!CheckBox)} />
          <label className="form-check-label" htmlFor="exampleCheck1"><Link to='/signup'>Accept Policy</Link></label>
        </div>
        <button disabled={!CheckBox} type="submit" className="btn btn-primary" style={{width:'100%'}}>Sign up</button>
        {WindowWidth <= 630? <div style={{marginBottom:'5px'}}> <Link to='/signin' style={{float:'right',fontSize:'18px',color:'#007aff',marginRight:'7px'}}>{WindowWidth>300 ?'Already have an account':'sign in'}</Link> </div>:null}
      </form>
      <div id='sign-up-error-message' style={{color:'red',textAlign:'center'}}></div>
    </div>
  )
}
