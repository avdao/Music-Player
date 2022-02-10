import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from './components/Header'





const SongsInCategory = (props => {



    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:8080/category/songs/${props.match.params.id}`)
            .then(function(response) {
                setData(response.data)
            })
            .catch(error=>console.log("Error"))
    },[])

    const listItems = data.map((item) =>
        <tr>{ item.project_name}<br/></tr>
    );


    return (
        <div>
            <Header/>

            <table className={'mainTable'} >
                <tr>

                    <td>Pjesma</td>


                </tr>


<tr>
    {listItems}
    </tr>


            </table>
        </div>
    );
});

export default SongsInCategory;