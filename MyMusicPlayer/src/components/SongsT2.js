import React, {Component, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";


import 'react-responsive-modal/styles.css';

import Play from '../play.png'

import '../songs.css'
import Header from "./Header";


class SongsT2 extends Component {
    constructor(props) {
        super(props);
    };




    render() {


        return (
            <div>





                <table className={'mainTable'} >
                    <tr>
                        <td>Song Name</td>
                        <td>Song Artist</td>
                        <td>Rating</td>
                        <td>Action</td>
                    </tr>


                    {this.props.post.map((customer,key) =>
                        <tr key={key}>
                            <td><Link   to={`/song/${customer._id}`}    className="nav-link">{customer.song_name}</Link>
                            </td>

                            <td>{customer.song_artist}</td>
                            <td>{customer.songRating}/5</td>
                            <td>
                                <Link to={`/listen/${customer._id}`} className={'buttton'}><img src={Play}
                                                                                                style={{width: '50px', height: '50px'}}/></Link>


                            </td>
                        </tr>
                    )}
                </table>


            </div>
        )
    }
}

export default SongsT2;


