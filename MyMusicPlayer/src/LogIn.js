import React, {useEffect, useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom'

import Header from "./components/Header";
import './logIn.css';
import Logo from './logo.png'
const LogIn = () => {
    const history=useHistory();
    const [errorMessage, setErrorMessage] = useState("")
    function handleLogin(e){
        e.preventDefault()
        const form =e.target;
        const user={
            username:form[0].value,
            password:form[1].value
        }
        fetch('http://localhost:8080/login',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(user)

        })
            .then(res=>res.json( ))
            .then(data=>{
                localStorage.setItem("token",data.token)
                setErrorMessage(data.message)
            })

    }
    useEffect(()=>{
        fetch("http://localhost:8080/isUserAuth",{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        })
            .then(res=>res.json())
            .then(data=>data.isLoggedIn?history.push('/'):null)

    },[])
    return (
        <div >
            <Header/>
            <div className={'wp'}>
            <div id={'logIn'}>
            <form  onSubmit={event=>handleLogin(event)}>
                <h1 id={'naslov'}>Log in </h1>
                <label>Username:</label>
                <br/>
                <input  required  type={'text'}/>
                <br/>
                <label>Password:</label>
                <br/>
                <input  required type={'password'}/>
                <br/>
                <input type={"submit"} value={"Submit"}/>
                {errorMessage === "Success" ? <Redirect to="/"/>: null}
            </form>

            </div>
                <div id={'secondContet'}>
                    <img src={Logo} alt={'logo'}/>
                    <h1>MY MUSIC PLAYER</h1>
                </div>
        </div>
        </div>
    );
};

export default LogIn;