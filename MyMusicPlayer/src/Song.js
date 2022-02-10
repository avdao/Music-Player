import React ,{useState,useEffect} from 'react';

import axios from "axios";
import Header from './components/Header'
import 'moment-timezone';
import {Link} from 'react-router-dom'




const Song = (props => {
    const[songName,setSongName]=useState("");
    const[artistName,setArtistName]=useState("");
    const[date,setDate]=useState('')

    const[songUrl,setSongUrl]=useState("");

    const[songRating,setSongRating]=useState("");


    useEffect(()=>{
        axios.get(`http://localhost:8080/song/${props.match.params.id}`)
            .then(res=>[
                setSongName(res.data.song_name),
                setArtistName(res.data.song_artist),
                setSongUrl(res.data.songUrl),
                setDate(res.data.date),
                setSongRating(res.data.songRating),

            ])
            .catch(error=>console.log("Error"))
    },[props])



    return (
        <div>
            <Header/>

                <div>
                    <label >Song name:</label>
                    <h3>{songName}</h3>
                    <label>Song Artist:</label>
                    <h3>{artistName}</h3>
                    <label>Song Url:</label>
                    <h3 >{songUrl}</h3>
                    <label>Song Rating:</label>
                    <h3 >{songRating}/5</h3>
                    <label>Datum postavljanja:</label>
                    <h3>{date}</h3>
                </div>


        </div>
    );
});
export default Song;