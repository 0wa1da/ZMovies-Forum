import React from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage.page'
import SigninPage from "./pages/SigninPage/SigninPage.page";
import SignupPage from './pages/SignupPage/SignupPage.page'
import AddPage from './pages/AddPage/AddPage.page';
import WatchedPage from './pages/WatchedPage/WatchedPage.page';
import WatchlistPage from './pages/WatchlistPage/WatchlistPage.page';
import Header from './component/header/Header.component';
import SignOutHeader from './component/header/SignOutHeader.component';

import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "./firebase/Firebase.Config";

export function debounce(fn,ms){
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this,arguments)
    }, ms);
  }
}
export function OutsideClick(ref,fcn) {
  React.useEffect(() => {
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              fcn()
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [fcn, ref]);
} 
export default function App() {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      document.getElementById("loader").style.display = "none";    
      document.getElementById("App").style.display = "block";
    });return
  }, [])
  
  const [user] = useAuthState(auth)
  
  return (
    <div className="App" id='App' style={{display:'none'}}>
      <Router>
       {user? <Header/> : <SignOutHeader/>}
        {user?
          <Switch>
          <Route exact path={'/'} component={HomePage} />
          <Route exact path='/watch-later' component={WatchlistPage}/>
          <Route exact path='/library' component={WatchedPage}/>
          <Route exact path='/movies' component={AddPage}/>
          <Route path='/' component={HomePage} />
          </Switch>
        : <Switch>
            <Route exact path='/signup' component={SignupPage} />
            <Route  path='/' component={SigninPage} />
          </Switch>
        }
      </Router>
    </div>
  );
}

// sign in with email and password _/
// sign up with email and password [with ability to upload profile pic -> ignored] (must accept policies) _/
// customize error messages _/
// Loading Page while loading _/
// open website when signed directly to homepage without go through sign in page _/
// profile pic appear in navbar/header * _/
// sign out with confirm message  _/

// Great Color #222222 rgb(34, 34, 34)

// fix refresh problem _/
// card clickable places _/
// change profile pic and upload to firebase_/

// responsive header and menu * _/
// work on design - - -
      //  title in small screens _/
      //  hover for navbar _/

// build a custom sort option  
// change loading, empty and ready to search color .. _/
// change routes name and buttons properties _/
// custom sort button _/
// design movies card _/
// fix click outside problem _/
// add time to chat messages  16:45 6/10/2020 _/ 
// resize card component _/

        // convert non square pic's to 50*50 square ones  - -
        // resize images before upload it to the firebase storage
        // firebase and storage security rules
        // host the app on firebase hosting 

// Dark Theme -> coming soon <-
//    finishing in 2 days    //