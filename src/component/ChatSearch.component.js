import React from 'react'
import send from '../pages/HomePage/send.png'
import firebase from 'firebase/app'
import {firestore, auth } from "../firebase/Firebase.Config";
import {debounce} from '../App'
import $ from 'jquery';

export default function ChatSearch() {

  const messagesRef = firestore.collection('messages')

  const [FormValue, setFormValue] = React.useState('')

  const onSubmit = async (e) => {
    // console.log('clicked')
    document.getElementById('chat-input').value = ''
    e.preventDefault()
    if(FormValue.replace(/\s/g, '').length){
      const {uid,photoURL} = auth.currentUser
      await messagesRef.add({
        text: FormValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL:photoURL //not firebase picture because it needs time to render
      })
      setFormValue('')
      document.getElementById('dummy').scrollIntoView()
    }}
    const [WindowWidth, setWindowWidth] = React.useState(window.innerWidth)
  
    React.useEffect(() => {
      let isMounted = true
      const debouncedHandelResize = debounce(function handlResize() {
        if(isMounted){
          setWindowWidth(window.innerWidth)
        }
      },250)
      window.addEventListener('resize',debouncedHandelResize)
      return () => {
        window.removeEventListener('resize',debouncedHandelResize)
        isMounted = false
      }
    })
    function isUnicode(str) {
      var letters = [];
      for (var i = 0; i <= str.length; i++) {
        letters[i] = str.substring((i - 1), i);
        if (letters[i].charCodeAt() > 255) { return true; }
      }
      return false;
    }
    var dir = $('input[type=text]');
    dir.keyup(function(e) {
      if (isUnicode(dir.val())) {
        $(this).css('direction', 'rtl');
      }
      else {
        $(this).css('direction', 'ltr');
      }
    }); 

  return (
  <div>
      <form style={{backgroundColor:'#fff8dc',display:'flex',justifyContent:'center'}} onSubmit={(e)=>onSubmit(e)}> 
        <input autoComplete='off' id='chat-input' className='white-placeholder' type="text" placeholder='Type a message'
         value={FormValue} onChange={(e)=>setFormValue(e.target.value)}
         style={{marginRight:'6px',borderRadius:'30px',padding:'0px 20px',height:'55px',color:'white',
         width:`${WindowWidth-70}px`,maxWidth:'1250px',backgroundColor:'  #03576e'}} />
        <button type='submit'
         style={{borderRadius:'50px',height:'55px',width:'55px',backgroundColor:'#1bb6e6',color:'white',display:'flex',justifyContent:'center',alignItems:'center'}}
         disabled={!FormValue.replace(/\s/g, '').length} >
          <img src={send} alt="send" height='37px'
          style={{...!FormValue.replace(/\s/g, '').length?{opacity:'0.5'}:{opacity:''},marginLeft:'4px'}} />
        </button>
      </form>
    </div>
  )
}
