import React, {useState,useEffect} from 'react';
import {useHistory, Link, Redirect, Route} from "react-router-dom";
import './../header.css'
import Logo from './../logo.png'
import Home from "../home";

const Header = () => {
    const history=useHistory()
    const [username,setUsername]=useState(null)
    async  function logout(){
        localStorage.removeItem("token")
        await history.push('/login')
    }
    useEffect(()=>{
        fetch("http://localhost:8080/isUserAuth",{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        })
            .then(res=>res.json())
            
            .then(data=>data.isLoggedIn?setUsername((data.username)):null)
    },[])

    return (
        <div id={"wraps"}>
            <div id={'placeForLogo'}>
                <img src={Logo}/>

            </div>

            <div id={'placeForLinks'}>

                <a href={'/'}>Home</a>
                {username ?
                    <div id={'placeForLinksSecond'}>
                        <a href={'/songs'}>Pjesme</a>
                        <a href={'/slusaj'}>SlusajPjesme</a>
                        <button onClick={logout}>Logout</button>
                    </div>:
                <div>

                    <a href={'/login'}>Login</a>

                </div>
                }



            </div>
            
        </div>
    );
};

export default Header;