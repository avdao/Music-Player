import React, {Component, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Table from 'react-bootstrap/Table'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Plus from './plus.png'
import Play from './play.png'
import Edit from './edit.png'
import Listen from "./Listen";
import Song from "./Song";
import Delete from './delete.png'
import './songs.css'
import {render} from "@testing-library/react";
import AddSongs from "./AddSongs";

class Songs extends Component {
    constructor(props) {
        super(props);


        this.state = {

            openModal: false


        };
    };

    onClickButton = e => {
        e.preventDefault()
        this.setState({openModal: true})
    }
    onCloseModal = () => {
        this.setState({openModal: false})
    }



    render() {

        const deleteArticle = id => {
            axios.delete(`http://localhost:8080/${id}`)
                .then((res => alert(res.data)))

            window.location.reload('http://localhost:8080/songs');
            this.setState(this.state.article.filter(elem => elem._id !== id))

        }
        return (
            <div>

                <Header/>
                <Link   to={`/category`}     className="nav-link">Kategorije</Link>

                <>
                <Link onClick={this.onClickButton} ><img src={Plus} className={'imgADD'}
                                                                             style={{width: '60px', height: '60px'}}/>
                </Link>
                <Modal open={this.state.openModal}  onClose={this.onCloseModal}>
                    <h3 style={{'text-align':'center'}}>Hello please add Songs</h3>
                    <AddSongs/>
                </Modal>
                    </>
<table className={'mainTable'} >
                    <tr>
                        <td>Song Name</td>
                        <td>Song Artist</td>
                        <td>Rating</td>
                        <td>Action</td>
                    </tr>

                    {this.props.post.map((customer,key) =>
                    <tr key={key}>

                        <td><Link   to={`/song/${customer._id}`}     className="nav-link">{customer.song_name}</Link>
                         </td>

                        <td>{customer.song_artist}</td>
                        <td>{customer.songRating}/5</td>
                        <td>

                            <Link  to={`/editsongs/${customer._id}`}  className={'buttton'}><img src={Edit}
                                                                                                 style={{width: '50px', height: '50px'}}/></Link>
                             <Link  onClick={()=>deleteArticle(customer._id)}  className={'buttton'} ><img src={Delete}
                                                                                                           style={{width: '50px', height: '50px'}}/></Link>

                        </td>
                    </tr>
                    )}
                </table>

            </div>
        )
    }
}

export default Songs;


