import React, {Component} from 'react';
import {Link} from "react-router-dom";

import Header from "./components/Header";

import 'react-responsive-modal/styles.css';

import './songs.css'

class Category extends Component {
    constructor(props) {
        super(props);

    };





    render() {


        return (
            <div>

                <Header/>

                <table className={'mainTable'} >
                    <tr>
                        <td>Category</td>

                    </tr>

                    {this.props.category.map((customer,key) =>
                        <tr key={key}>
                            <td><Link   to={`/category/songs/${customer._id}`}     className="nav-link">{customer.category_name}</Link>,
                            </td>




                        </tr>
                    )}
                </table>

            </div>
        )
    }
}

export default Category;

