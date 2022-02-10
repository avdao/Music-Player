import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";




const AddSongs = (props) => {

    const[songName,setSongName]=useState("");
    const[artistName,setArtistName]=useState("");
    const[songRating,setSongRating]=useState("");
    const[songUrl,setSongUrl]=useState("");
    const[date,setDateNow]=useState(Date.now)
    const[category,setCategory]=useState("")
    const [category1,setCategory1]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:8080/category")
            .then(res=>setCategory1(res.data))
            .catch(error=>console.log(error));
    },[])
    const changeOnClick=e=>{
        e.preventDefault();
        const formData=new FormData();




        formData.append("song_name",songName);
        formData.append("song_artist",artistName);
        formData.append("songUrl",songUrl);
        formData.append('date',date);
        formData.append('category',category)
        formData.append('songRating',songRating)


        setSongName('');
        setArtistName('');
        setSongUrl('');
        setSongRating('');
        setDateNow('');
        setCategory('')

        console.log(formData)

        axios.post("http://localhost:8080/songs",formData,{headers: {'content-type':'application/json' }})
                .then(res1=>console.log("Good"))
                .catch(err =>console.log("Error"))

        window.location.reload('http://localhost:8080/songs');

    }










    return (
        <form onSubmit={changeOnClick} encType={"multipart/form-data"}>

            <div >
                <div>
                    <div className="form-group" >
                        <label htmlFor="songName">Song Name:</label>
                        <input type="text"
                               onChange={e=>setSongName(e.target.value)}
                               value={songName}
                               className="form-control"
                               placeholder="Song Name:"/>

                    </div>

                    <div className="form-group" >
                        <label htmlFor="artistName">Artist Name:</label>
                        <input type="text"
                               onChange={e=>setArtistName(e.target.value)}
                               value={artistName}
                               className="form-control"
                               placeholder="Artist Name:"/>

                    </div>
                    <div className="form-group" >

                        <label htmlFor="Song Url">Song URL :  </label>
                        <input type="text"
                               onChange={e=>setSongUrl(e.target.value)}
                               value={songUrl}
                               className="form-control"
                               placeholder="Song URL:"/>
                    </div>
                    <label>Ocijeni Pjesmu:</label>
                    <select name="songRating"  onChange={e=>setSongRating(e.target.value)} value={songRating} >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>


                    </select>
                    <div className="form-group" >

                        <label htmlFor="customer">Choose a Category:</label>

                        <select name="customer" id="customer" onChange={e=>setCategory(e.target.value)}
                                value={category}>
                            {category1.map((customer,key) =>
                                <option key={key} value={customer._id}>{customer.category_name}</option>)}

                        </select>


                    </div>
                </div>





            </div>
            <div id={'lastContent'}>       <button type="submit" id="buttton" >PostSongs</button>
                <Link to={'/'} type="submit"
                      id="buttton">Back to Home</Link></div>

        </form>

    );
};

export default AddSongs;