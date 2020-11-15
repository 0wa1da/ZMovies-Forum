import React from 'react'
import CardItem from '../../component/carditem/CardItem.component'

import { firestore, auth } from "../../firebase/Firebase.Config";
import { useCollectionData } from 'react-firebase-hooks/firestore'

export default function WatchlistPage(props) {

  const watchListRef = firestore.collection('users').doc(`${auth.currentUser.uid}`).collection('watchList')
  const [watchList] = useCollectionData(watchListRef,{idField : 'id'})

  return (
    <div>
      <p className='pageTitle'>Watch Later</p>
      <hr className='hr' />
      <div className="collectionlist-container" style={{minHeight:`${  window.innerHeight - 267.31 - 20}px`}} >
        {watchList && watchList.map((item,i)=>
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
        {!watchList &&
          <div style={{display:'grid',alignContent:'center',justifyContent:'center'}}>
            <p style={{fontSize:'35px',color:'#4682b4'}}>Loading ...</p>
          </div>
        }
        { watchList !== undefined && watchList.length === 0 ?
          <div style={{display:'grid',alignContent:'center',justifyContent:'center'}}>
            <p style={{fontSize:'35px',color:'#dc3636'}}>empty..</p>
          </div>
          : null
        }
        </div>
    </div>

  )
}
