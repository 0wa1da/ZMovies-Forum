import React, { useState } from 'react';
import "./AddPage.style.css";
import CardItem from '../../component/carditem/CardItem.component';

import {OutsideClick, debounce} from '../../App'

export default function AddPage() {
  
  const [state,setState] = useState({movies : []})
  const [Select, setSelect] = useState('None')
  const handlSearch = (e)=>{
    setSelect('None') 
    if(e.target.value.replace(/\s/g, '').length){ // check if search just contain white spaces   
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=3114fdf88a3864491975a74f60ea1c7c&language=en-us&page=1&include_adult=false&query=${e.target.value}`)
      .then(response => response.json())
      .then(data =>{
        if(!data.error){
          const cleanData = data.results.map(function(movie){
            if(movie !== '0000'){
              if(movie.hasOwnProperty('title') === false || movie.title ==='')
                // eslint-disable-next-line array-callback-return
                return

              if(movie.hasOwnProperty('overview') === false || movie.overview ==='' || movie.overview === undefined)
                 movie['overview'] = 'UnAvailable' 
                
              if(movie.hasOwnProperty('popularity') === false || movie.popularity ==='' || movie.popularity === undefined)
                 movie['popularity'] = 'UnAvailable'
                  
              if(movie.hasOwnProperty('release_date') === false || movie.release_date ==='' || movie.release_date === undefined)
                 movie['release_date'] = '0000'
              
              if(movie.hasOwnProperty('poster_path') === false || movie.poster_path ==='')
                 movie['poster_path'] = 'UnAvailable'
              // return movie
              return {
                id:`${movie.id}`,
                title : `${movie.title}`,
                poster_path : `${movie.poster_path}`,
                release_date : `${movie.release_date}`,   
                popularity : `${movie.popularity}`,
                overview : `${movie.overview}`
              }
            // eslint-disable-next-line array-callback-return
            }else return
          })
          setState({movies : cleanData})
        }
        else
          setState({movies : []})
      })
      .catch((error)=>console.log(error))
    }   
  }
  const handleSort = (option)=>{

    setSelect(option)

    if(option === 'None' && document.getElementById('searcharea-input').value.replace(/\s/g, '').length){
      handlSearch({target:{value:document.getElementById('searcharea-input').value}})
    }
    else if(option === 'None'){
      handlSearch({target:{value:'a'}})
    }
    else{
      const sortedList = state.movies.sort(
        (a,b) => {
          if(option === 'Newest')
          return parseInt(b.release_date.substring(0,4)) - parseInt(a.release_date.substring(0,4))
          if(option === 'Oldest')
          return parseInt(a.release_date.substring(0,4)) - parseInt(b.release_date.substring(0,4))
          return parseInt(a.release_date.substring(0,4)) + parseInt(b.release_date.substring(0,4))
        }
      )
      setState({movies : sortedList})
    }
  }

  React.useEffect(() => {
    let mount = true
    if(mount)handlSearch({target:{value:'a'}})
    return () => mount = false
  }, [])

  const [Drop, setDrop] = React.useState(false)
  
  const optionMenu = React.useRef(null)
  OutsideClick(optionMenu,()=>setDrop(false))

  const [WindowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    let isMounted = true;
    const debouncedHandelResize = debounce(function handlResize() {
      if(isMounted) setWindowWidth(window.innerWidth)
    },1000)
    window.addEventListener('resize',debouncedHandelResize)
    return () => {
      window.removeEventListener('resize',debouncedHandelResize)
      isMounted = false
    }
  })
  
  return (
    <div>
      <div className='pageTitle'>Movies Search</div>
      <div className="searchrea-container" style={{textAlign:'center'}} >
        <form onSubmit={(e)=>e.preventDefault()}>
            <input id='searcharea-input' autoComplete='off' type="search" className="form-control searcharea-input" onChange={handlSearch } 
            style={{width:`${WindowWidth*0.8 - 107}px`}} />
            <div ref={optionMenu} style={{display:'inline-block',width:'97px'}}>
              <div className='optionSelected' onClick={()=>setDrop(!Drop)}>{Select === 'Newest'?'Newest':Select === 'Oldest'?'Oldest':'Sort'}</div>
              <div className='optionMenu' style={{display:!Drop?'none':null}}>
                <div className='optionMenuItem' style={Select === 'Newest'?{display:'none'}:null} onClick={()=>{handleSort('Newest');setDrop(false)}}>Newest</div>
                <div className='optionMenuItem' style={Select === 'Oldest'?{display:'none'}:null} onClick={()=>{handleSort('Oldest');setDrop(false)}}>Oldest</div>          
                <div className='optionMenuItem' style={Select === 'None'  ?{display:'none'}:null} onClick={()=>{handleSort('None');setDrop(false)}}>None</div>          
              </div>
            </div>
          </form>
      </div> 
      <div className="collectionlist-container" style={{minHeight:`${window.innerHeight - 267.31 - 20}px`}} >
        {state.movies && state.movies.map((item,i)=>
          <CardItem
            key = {item.id}
            id = {item.id}
            title = {item.title}
            poster_path = {item.poster_path}
            release_date = {item.release_date}
            popularity = {item.popularity}
            overview = {item.overview}
          />
        )}  
        {document.getElementById('searcharea-input') && !state.movies.length && document.getElementById('searcharea-input').value.replace(/\s/g, '').length ?
          <div style={{display:'grid',alignContent:'center',justifyContent:'center'}}>
            <p style={{fontSize:'35px',color:'#dc3636'}}>Not Found !</p>
          </div> : null
        }
        
        {!state.movies.length && !document.getElementById('searcharea-input')?
          <div style={{display:'grid',alignContent:'center',justifyContent:'center'}}>
            <p style={{fontSize:'35px',color:'#4682b4'}}>Loading ...</p>
          </div>: null
        }
      </div>       
    </div>
  )
}