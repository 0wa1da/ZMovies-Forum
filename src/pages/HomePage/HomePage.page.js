import React from 'react'

import { firestore, auth } from "../../firebase/Firebase.Config";
import { useDocumentData , useCollectionData } from 'react-firebase-hooks/firestore'

import profilePic from '../../temp/profilePic.jpg'

import {debounce} from '../../App'
import ChatSearch from '../../component/ChatSearch.component';

export default function HomePage() {

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt','desc')//.limit(50)
  const [messages] = useCollectionData(query,{idField : 'id'})

  const [WindowHeight, setWindowHeight] = React.useState(window.innerHeight)
  const [WindowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    let isMounted = true
    const debouncedHandelResize = debounce(function handlResize() {
      if(isMounted){
        setWindowHeight(window.innerHeight)
        setWindowWidth(window.innerWidth)
      }
    },250)
    window.addEventListener('resize',debouncedHandelResize)
    return () => {
      window.removeEventListener('resize',debouncedHandelResize)
      isMounted = false
    }
  })

  return (
    <div style={{display:'grid',justifyContent:'center',backgroundColor:'#eae6da'}}>
      <div style={{border:'solid #00212a 2px',borderTop:'0px',borderBottom:'0px'}}>
        <div className='messages-container' 
        style={{display:'flex',flexDirection:'column-reverse', padding:'15px',backgroundColor:'#fff8dc',
        height:`${WindowHeight - 85 -57}px`,width:`${WindowWidth-4}px`,maxWidth:'1320px',overflowY:'auto'}} >     
          <div id='dummy'></div>
          {messages && messages.map((msg) =><ChatMessage key={msg.id} message={msg}  />)}           
          <p></p> {/* to make a top space before first message*/}

          {!messages &&
            <div style={{display:'grid',alignContent:'center',justifyContent:'center',height:'100%'}}>
              <p style={{fontSize:'35px',color:'#4682b4'}}>Loading ...</p>
            </div>
          }
        </div>
        <ChatSearch/>
      </div>
    </div>
  )
}

export function ChatMessage(props) {
  const { text, uid, photoURL } = props.message
  const messageClass = uid===auth.currentUser.uid?
   {backgroundColor:'rgb(28, 182, 230)',float:'right'}
   : {backgroundColor:'rgb(69, 73, 74)',float:'left'}
  
  const docRef = firestore.collection('profileImages').doc(`${uid}`)
  const [doc] = useDocumentData(docRef,{idField : 'id'})
  var firestorePic = null
  if(doc){
    firestorePic = doc.url
  }
  function timeConverter(a){
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = (date<10 ? '0'+date : date) + '/' + month + '/' + year.toString().substring(2) + ' ' + (hour%12 === 0 ? '12' : hour%12) + ':' + (min < 10 ? '0' + min : min) + (hour>12 ? ' pm' : ' am');
    return time;
  }
  function timeDisplay(props){
    var a = new Date(props * 1000)
    var time = timeConverter(a)
    var b = new Date()
    var today = timeConverter(b)
    var c = new Date()
    c.setDate(c.getDate() - 1)
    var yesterday = timeConverter(c)
    if(time.substring(0,9) === today.substring(0,9))
      return 'Today' + time.substring(9)
    if(time.substring(0,9) === yesterday.substring(0,9))
      return 'Yesterday' + time.substring(9)
    return time 
  }
  return (
    <div style={{margin:'15px 0px'}}>
      <div style={{...uid===auth.currentUser.uid?{float:'right'}:{float:'left'}  
      ,borderRadius:'50px',display:'flex',height:'100%'}}>
        <div style={{display:'inline-flex',justifyContent:'center',borderRadius:'50px',
          backgroundColor:'#eae6d9',alignSelf:'flex-end',height:'50px',width:'50px',overflow:'hidden'}}>
          <img src={firestorePic || photoURL || profilePic} alt="profile" height='50px'/>
        </div>
        <div style={{alignSelf:'flex-end',width:'0px',marginBottom:'-20px'}}>
          <div style={{...uid===auth.currentUser.uid?{marginRight:'62px'}:{marginLeft:'12px'},float:uid===auth.currentUser.uid?'right':'left',textAlign:uid===auth.currentUser.uid?'right':'left',
          display:'absolute',width:'110px',fontSize:'12px',color:'black'}}>{props.message.createdAt && timeDisplay(props.message.createdAt.seconds)}</div>
        </div>
      </div>
      <span style={{...messageClass,margin:'0px 12px',padding:'7px 10px'
       ,textAlign:'left',color:'white',borderRadius:'20px',maxWidth:'60%',wordWrap: 'break-word'}}>
        {text}
      </span>
    </div>
  )
}