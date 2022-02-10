import React from 'react';
import Header from "./components/Header";
import './home.css'
import IMG from './img.jpg'
const Home = () => {
    return (
        <div>
            <Header/>
            <div id={'mainContet'}>
                <div id={'text'}>
                    <h1>My Music Player</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at consequuntur culpa, deserunt dolorem eligendi expedita
                        id illo iusto necessitatibus nobis odit perferendis porro quae quia,
                        quibusdam ratione sed Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ad esse, harum impedit magnam natus obcaecati sed voluptatum! Corporis eum molestias,
                        nisi recusandae suscipit totam. Blanditiis cumque delectus exercitationem modi nam?
                        orem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at consequuntur culpa, deserunt dolorem eligendi expedita
                        id illo iusto necessitatibus nobis odit perferendis porro quae quia,
                        quibusdam ratione sed Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ad esse, harum impedit magnam natus obcaecati sed voluptatum! Corporis eum molestias,
                        nisi recusandae suscipit totam. Blanditiis cumque delectus exercitationem modi nam?

                    </p>


                </div>
                <div id={'imgHome'}>
                    <img src={IMG} alt={'img'}/>

                </div>
            </div>




        </div>
    );
};

export default Home;