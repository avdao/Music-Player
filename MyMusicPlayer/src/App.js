import Home from "./home";
import React, {lazy, Suspense, useEffect, useState} from 'react'
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import LogIn from "./LogIn";
import EditSongs from "./EditSongs";
import './App.css'
import Listen from "./Listen";
import Loading from './loadingNotes.png'
import axios from "axios";
import Song from "./Song";
import Category from "./Category"
import SongsT2 from "./components/SongsT2";
import SongsInCategory from "./SongsInCategory";
//import Songs from "./Songs";
const Songs= lazy(() => import('./Songs'));
function App() {
    const [post,setPost]=useState([]);
    const [category,setCategory]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:8080/songs")
            .then(res=>setPost(res.data))
            .catch(error=>console.log(error));
    },[])
    useEffect(()=>{
        axios.get("http://localhost:8080/category")
            .then(res=>setCategory(res.data))
            .catch(error=>console.log(error));
    },[])


    const [username,setUsername]=useState(null)

    useEffect(()=>{
        fetch("http://localhost:8080/isUserAuth",{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        })
            .then(res=>res.json())

            .then(data=>data.isLoggedIn?setUsername((data.username)):null)
    },[])

console.log(username)
    return (
    <div className="App">
      <Switch>


          <Route exact path={"/"} render={() => <Home/> }/>
          <Route exact path={"/login"} render={() => <LogIn/> }/>


          {username &&(
              <>
          <Route exact path={"/listen/:id"} render={(props)=><Listen {...props} post={post}/>} />
                  <Route  exact path={"/category/songs/:id"} render={(props)=>
                      <SongsInCategory {...props} category={category}/>} />
          <Route  exact path={"/slusaj"} render={() => <SongsT2 post={post}/> }/>
                  <Route  exact path={"/category"} render={() =><Category category={category}/>}/>
          <Route  exact path={"/song/:id"} render={(props)=><Song {...props} post={post}/>} />
          <Route exact path={"/editsongs/:id"} render={(props)=> <EditSongs {...props} post={post}/> }/>
                <Suspense fallback={
              <div id={'md'}>
                  <img  id={'img'} src={Loading}/>
                  <h2>Still Loading…</h2></div>}>

              <Route  exact path={"/songs"} render={() =><Songs post={post}/>}/>
          </Suspense>
              </>
          )}



      </Switch>
    </div>
  );
}

export default App;
