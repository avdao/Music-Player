import React ,{useState,useEffect} from 'react';

import axios from "axios";
import Header from './components/Header'

import {Link} from 'react-router-dom'
import SongsT2 from "./components/SongsT2";




const Listen = (props => {
    const[songName,setSongName]=useState("");



    useEffect(()=>{
        axios.get(`http://localhost:8080/listen/${props.match.params.id}`)
            .then(res=>[
                setSongName(res.data.song_name)

            ])
            .catch(error=>console.log("Error"))
    },[props])



    return (
        <div>
            <Header/>


            <div>

        <h1 style={{'color':'red','text-align':'center'}}>Trenutno slusas:</h1>
                <h2 style={{'text-align':'center'}}>{songName}</h2>
            </div>

<SongsT2 post={props.post}/>
        </div>
    );
});
export default Listen;