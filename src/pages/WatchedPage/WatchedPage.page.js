import React from 'react'
import CardItem from '../../component/carditem/CardItem.component'

import { firestore, auth } from "../../firebase/Firebase.Config";
import { useCollectionData } from 'react-firebase-hooks/firestore'

export default function WatchedPage(props) {

  const watchedRef = firestore.collection('users').doc(`${auth.currentUser.uid}`).collection('watched')
  const [watched] = useCollectionData(watchedRef,{idField : 'id'})
  return (
    <div >
      <p className='pageTitle'>Library</p>
      <hr className='hr'/>
      <div className="collectionlist-container" style={{minHeight:`${  window.innerHeight - 267.31 - 20}px`}} >
        {watched && watched.map((item) =>
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
        {!watched &&
          <div style={{display:'grid',alignContent:'center',justifyContent:'center'}}>
            <p style={{fontSize:'35px',color:'#4682b4'}}>Loading ...</p>
          </div>
        }
        { watched !== undefined && watched.length === 0 ?
          <div style={{display:'grid',alignContent:'center',justifyContent:'center'}}>
          <p style={{fontSize:'35px',color:'#dc3636'}}>empty..</p>
          </div>
          : null
        }
      </div>
    </div>
  )
}
