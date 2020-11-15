import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

import {debounce} from '../../App'

export default function SignOutHeader() {
  const [update, setUpdate] = React.useState(true)
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
    <ul style={{position:'fixed',top:'0',listStyle:'none', width:'100vw',backgroundColor:'#4682b4',
      margin:'0px',padding:'10px', marginBottom:'30px', height:"85px",zIndex:'999'}}>
    {WindowWidth > 630 ?
        <ul>
        <li className='active' style={{float:'left',cursor:'pointer'
          ,display: 'block',color: 'white',textAlign: 'center',padding: '13px 14px'}}> ZMovies-Forum
        </li>
        <ul style={{...WindowWidth > 660 ?{marginLeft:'42%',width:`${WindowWidth - 200}px`} : {margin:'auto'}}}>
          <li onClick={function(){setUpdate(!update)}}
            style={{display:"inline",border:'0px',marginRight:'20px'}}>
            <Link to='/' style={{...document.location.pathname !== '/signup'? {borderBottom:'solid white'} : {}}}>
            SignIN
          </Link></li>  

          <li onClick={function(){setUpdate(update +1)}} style={{display:"inline"}}>
            <Link to='/signup' style={{...document.location.pathname === '/signup'? {borderBottom:'solid white'} : {}}}>
            SignUP
          </Link></li>
        </ul>
      </ul>:
      <div>
        <li className='active' 
          style={{position:'absolute',display:`${WindowWidth < 259.55 + 20 + 100 +20 ? 'none' : ''}`,width:`${WindowWidth - 20 - 50}px`
          ,marginLeft:'50px',textAlign:'center'}}>
          <Link style={{marginRight:'50px'}} to='/'>ZMovies Forum</Link>
        </li>
      </div>
    }
    </ul>
  )
}
