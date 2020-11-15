import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import { firestore,auth } from "../../firebase/Firebase.Config";
import profilePic from '../../temp/profilePic.jpg'

import firebase from 'firebase/app'
import 'firebase/storage';
import { useDocumentData} from 'react-firebase-hooks/firestore'

import {debounce} from '../../App'
import {OutsideClick} from '../../App'

export default function Header() {

  const [update, setUpdate] = React.useState(true)
  const [Drop,setDrop] = React.useState(false)


  const [WindowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    let isMounted = true;
    const debouncedHandelResize = debounce(function handlResize() {
      if(isMounted) setWindowWidth(window.innerWidth)
    },250)
    window.addEventListener('resize',debouncedHandelResize)
    return () => {
      window.removeEventListener('resize',debouncedHandelResize)
      isMounted = false
    }
  })

  const docRef = firestore.collection('profileImages').doc(`${auth.currentUser.uid}`)
  const [doc] = useDocumentData(docRef,{idField : 'id'})
  var firestorePic = null
  if(doc){
    firestorePic = doc.url
  }

  const loadFile = (event) => {
    var file = event.target.files[0]
    var storageRef = firebase.storage().ref('profileImages/' + auth.currentUser.uid + '/profile')
    var task = storageRef.put(file)
    task.on('state_changed',function(error) {
      task.snapshot.ref.getDownloadURL().then(function (url) {
        docRef.set({url})
      console.log(error)})
    })
  }
  let where = document.location.pathname

  const Menu = React.useRef(null)
  OutsideClick(Menu,()=>setDrop(false))

  return (
    
    <ul style={{position:'fixed',top:'0',listStyle:'none', width:'100%' , backgroundColor:'#4682b4',
       margin:'0px',padding:'10px', height:"85px",zIndex:'999'}}>
      { WindowWidth >= 790 ?
      <ul>
        <li className='active' style={{display:'inline'}} onClick={function(){setUpdate(!update)}} >
        <Link to='/'>
          ZMovies Forum<hr style={where === '/'?{borderBottom:'white solid 4px',marginTop:'7px'}: {display:'none'}} className='hr'/>
        </Link></li>

        <li style={{display:"inline"}} onClick={function(){setUpdate(!update)}} >
          <Link style={where === '/watch-later'?{borderBottom:'solid white'}: null} to='/watch-later'>
            Watch Later
          </Link>
        </li>

        <li style={{display:"inline"}} onClick={function(){setUpdate(update +1)}} >
          <Link style={where === '/library'?{borderBottom:'solid white'}: null} to='/library'>
            Library
          </Link>
        </li>  
        <li ref={Menu} style={{display:"inline",justifyContent:'center',float:'right',border:'0px',margin:'5px 20px 0px 0px',
           }} >
          <div style={{display:"flex",justifyContent:'center',backgroundColor:'#eae6d9',
               height:'50px',width:'50px',overflow:'hidden',borderRadius:'50%',cursor:'pointer'}} onClick={() => setDrop(!Drop)}>
            <img src={firestorePic || auth.currentUser.photoURL || profilePic} alt="profile" height='50px'/>
          </div>
            
          <div style={{height:'auto',width:'200px',backgroundColor:'white',display:`${!Drop ? 'none' : ''}`,position: 'fixed',
            minWidth: '80px',boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',zIndex: '999',marginLeft:'-150px'
            ,borderRadius:'7%',padding:'10px 4px 8px 4px'}}>

            <div style={{textAlign:'center',padding:'5px 0px'}}>
              <label htmlFor="file" style={{display:'inline-flex',justifyContent:'center',backgroundColor:'#eae6d9',
                  height:'66px',width:'66px',borderRadius:'50%',overflow:'hidden',cursor: "pointer",margin:'0'}}
                  onMouseEnter={()=>{document.getElementById('edit').style.display='block';document.getElementById('output').style.opacity='0.1'}}
                  onMouseLeave={()=>{document.getElementById('edit').style.display='none';document.getElementById('output').style.opacity='1'}} >
                <img id='output' title='Edit profile' alt='Edit profile' src={firestorePic || auth.currentUser.photoURL || profilePic} height='66px' /> 
                <div id='edit' style={{fontSize:'16px',position:'absolute',margin:'20px 0px',display:'none'}}>Change</div>
              </label>
              <input type="file"  accept="image/*" name='image' id="file" style={{display:'none'}} onChange={loadFile} />
            </div>

            <Link className='dropList-item' onClick={() => setUpdate(!update)} to='/'>
              ZMovies Forum
            </Link>
            <Link className='dropList-item' onClick={() => setUpdate(!update)} to='/movies'>
              Movies
            </Link>
            <Link className='dropList-item' onClick={() => setUpdate(!update)} to='/watch-later'>
              Watch Later
            </Link> 
            <Link className='dropList-item' onClick={() => setUpdate(!update)} to='/library'>
              Library 
            </Link>
            <div id='dark' className='dropList-item' style={{cursor:'default'}}> {/* temporary action */}
              Dark Theme <span role='img' aria-label='lock emoji'>&#128274;</span>
            </div>
            <div className='dropList-item' onClick={() => auth.signOut()}>
              Sign Out
            </div>
          </div>
        </li>
        <li onClick={function(){setUpdate(!update)}} style={{display:"inline"}}>
        <Link style={where === '/movies'?{borderBottom:'solid white'}: null} to='/movies'>
          Movies
        </Link></li>  
      </ul>  
      :
      <ul style={{textAlign:'center'}}>
        <div ref={Menu}>
          <div id='sideMenu' style={{width:`${!Drop ? '0px' : Drop && WindowWidth*0.4>300 ? '50vw' : Drop && WindowWidth >350 ? '300px' : WindowWidth >250 ? '200px':'0px'}`,height:'100vh',backgroundColor:'#1bb6e6',position: 'absolute',
               boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',zIndex: '999',margin:'-10px 0px 0px -10px'
               ,padding:'10px 0px',overflow:'hidden'}}>
            <div style={{height:'100vh',backgroundColor:'white',position: 'absolute',
               minWidth:`${WindowWidth*0.4>300 ? '50vw' :WindowWidth >350 ? '300px' : WindowWidth >250 ? '200px':'0px'}`,boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',zIndex: '999',margin:'-10px 0px 0px 0px'
               ,padding:'10px 0px'}}>

              <div style={{marginRight:'10px',height:'36px',minWidth:`${WindowWidth*0.4>300 ? '50vw' :WindowWidth >350 ? '300px' : WindowWidth >250 ? '200px':'0px'}`,marginBottom:'-15px'}} className="close" aria-label="Close">
                <span style={{float:'right',marginRight:'10px'}} aria-hidden="true" onClick={()=>setDrop(false)}>&times;</span>
              </div>
                
              <div style={{textAlign:'center',padding:'5px 0px'}}>
                <label htmlFor="file" style={{display:'inline-flex',backgroundColor:'#eae6d9',justifyContent:'center',height:'80px',width:'80px',borderRadius:'50%',overflow:'hidden',cursor: "pointer",margin:'0'}}
                  onMouseEnter={()=>{document.getElementById('edit').style.display='block';document.getElementById('output').style.opacity='0.1'}}
                  onMouseLeave={()=>{document.getElementById('edit').style.display='none';document.getElementById('output').style.opacity='1'}} >
                  <img id='output' title='Edit profile' alt='profile' src={firestorePic || auth.currentUser.photoURL || profilePic} height='80px'/> 
                  <div id='edit' style={{fontSize:'16px',position:'absolute',margin:'27px 0px',display:'none'}}>Change</div>
                </label>
                  <div className='emailDisplay' style={{textAlign:'center',margin:'10px 10px 0px 10px',fontSize:'60%',overflowX:'auto',paddingBottom:'10px'}}>{auth.currentUser.email}</div>
                <input type="file"  accept="image/*" name='image' id="file" style={{display:'none'}} onChange={loadFile} />
              </div>
              <hr className='hr' style={{marginBottom:'15px'}}/>
              <Link className='dropList-item' onClick={() => {setUpdate(!update);setDrop(false)}} style={where === '/'?{color:'#1bb6e6'}: null} to='/'>
                ZMovies Forum
              </Link>
              <Link className='dropList-item' onClick={() => {setUpdate(!update);setDrop(false)}} style={where === '/movies'?{color:'#1bb6e6'}: null} to='/movies'>
                Movies
              </Link>
              <Link className='dropList-item' onClick={() => {setUpdate(!update);setDrop(false)}} style={where === '/watch-later'?{color:'#1bb6e6'}: null} to='/watch-later'>
                Watch Later
              </Link> 
              <Link className='dropList-item' onClick={() => {setUpdate(!update);setDrop(false)}} style={where === '/library'?{color:'#1bb6e6'}: null} to='/library'>
                Library 
              </Link>
              <div id='dark' className='dropList-item' style={{cursor:'default'}}> 
                Dark Theme <span role='img' aria-label='lock emoji'>&#128274;</span>
              </div>
              <div className='dropList-item' onClick={() => auth.signOut()}>
                Sign Out
              </div>
            </div>
          </div>
              
          <li style={{display:"inline",float:'left',border:'0px',margin:`-7.5px 0px 0px 0px`}} >
          <span className='menuIcon' style={{color:'white'}} onClick={() => setDrop(!Drop)} >&#9776;</span>
          </li>
           
        </div>
        <div>
          <li className='active' 
            style={{position:'absolute',display:`${WindowWidth < 259.55 + 20 + 100 +20 ? 'none' : ''}`,width:`${WindowWidth - 20 - 50}px`
            ,marginLeft:'50px',textAlign:'center'}}>
            <Link style={{marginRight:'50px'}} to='/'>ZMovies Forum</Link>
          </li>
        </div>
      </ul>
      }
    </ul>
  )
}
