import React,{useState} from 'react'
import "./CardItem.css"
import { firestore, auth } from "../../firebase/Firebase.Config";
import { useCollectionData } from 'react-firebase-hooks/firestore'


export default function CardItem(props) {
  const watchedRef = firestore.collection('users').doc(`${auth.currentUser.uid}`).collection('watched')
  const watchListRef = firestore.collection('users').doc(`${auth.currentUser.uid}`).collection('watchList')
  
  const [watched] = useCollectionData(watchedRef,{idField : 'id'})
  const [watchList] = useCollectionData(watchListRef,{idField : 'id'})
  const where = document.location.pathname
  const item = (props) =>({  
    title : `${props.title}`,
    poster_path : `${props.poster_path}`,
    release_date : `${props.release_date}`,   
    popularity : `${props.popularity}`,
    overview : `${props.overview}` })

  const addToWatched = () => {watchedRef.doc(`${props.id}`).set(item(props));watchListDelete()}
  const addToWatchList = () => {watchListRef.doc(`${props.id}`).set(item(props));watchedDelete()}

  const watchedDelete = () => {watchedRef.doc(`${props.id}`).delete()}
  const watchListDelete = () => {watchListRef.doc(`${props.id}`).delete()}
  
  function fcn2(){
    let result = false
    watched && watched.map((item)=>{if(item.id === props.id){result = true}return item})
    return result
  }
  function fcn(){
    let result = false
    watchList && watchList.map((item)=>{if(item.id === props.id){result = true}return item})
    return result
  }
  const original = {backgroundImage:`url(${props.poster_path === 'null' ||props.poster_path == null || props.poster_path === 'unAvailable'?
  null : `http://image.tmdb.org/t/p/w185${props.poster_path}`})`,  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', backgroundColor:'#eae6da'}

  const [IsClosed, setIsClosed] = useState(true)

  return(
    <div className="flip-card">
      <div className="flip-card-inner" style={{transform: !IsClosed? 'rotateY(180deg)': ''}}>
        <div className="flip-card-front" style={{...original,display:'flex',flexDirection:'column',justifyContent:'center'}}
          onClick={()=>setIsClosed(false)}>
          {props.poster_path === 'null' ||props.poster_path == null || props.poster_path === 'unAvailable'?
          <p style={{...true ?{fontSize:'calc(250px * 14 /9 * 25 /280)'} : {display:'none'}}} >
          No Photo Available</p>: null }
        </div>
        <div className="flip-card-back">
          <div>
            <div style={{padding:'0px calc(250px * 14 /9 * 15 /280)',height:'calc(250px * 14 /9 * 36 /280)',float:'left',marginTop:'10px'}} onClick={()=>setIsClosed(true)} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </div>
    
            <section className="carditem-info-container" style={{marginTop:'calc(250px * 14 /9 * 10 /280)',maxHeight:'calc(250px * 14 /9 * 180 /280)',display:'block'}}>
              <p style={{fontSize:"calc(250px * 14 /9 * 15 /280)",fontFamily:"cursive,Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",color:'#4682b4'}}>
                {(props.title === 'UnAvailable' || props.title === undefined) ? 'UnAvailable' : props.title} 
              </p>     
              
              <p style={{backgroundColor:'black',padding:'calc(250px * 14 /9 * 1 /280) calc(250px * 14 /9 * 2 /280)',color:'white',fontSize:"calc(250px * 14 /9 * 13 /280)",fontFamily:"cursive"}}>
                Popularity : <span style={{color:'#fcd40c'}}> {props.popularity === 'UnAvailable' ? 'UnAvailable' : String(props.popularity).substring(0,4)} &#9734;</span>
              </p>
    
              <p style={{fontSize:"calc(250px * 14 /9 * 12 /280)",fontFamily:"cursive"}}>
                Release Date : {props.release_date === '0000' ? 'UnAvailable' : String(props.release_date).substring(0,4)}
              </p>
    
              <p style={{fontSize:"calc(250px * 14 /9 * 13 /280)",fontFamily:"sans-serif",color:'#00337e',textAlign:'justify'}}>
                {props.overview}
              </p> 
            </section>
            <div style={{marginTop:'calc(250px * 14 /9 * 20 /280 )'}}>
              <button style={{marginRight:'calc(250px * 14 /9 * 5 /280)'}} className={where ==='/movies' && fcn() ? 'disabled-button' : 'card-button'} 
                onClick={where === '/watch-later'? addToWatched : addToWatchList} >{where === '/watch-later'?'Library' :'Watch Later'}
              </button>  
              <button className={where ==='/movies' && fcn2() ? 'disabled-button' : where ==='/movies' && !fcn2() ? 'card-button' : 'delete-button'}
                onClick={where === '/watch-later'? watchListDelete : where === '/library' ? watchedDelete : addToWatched } >{where !== '/movies' ? 'Delete' : 'Library'}
              </button>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}
