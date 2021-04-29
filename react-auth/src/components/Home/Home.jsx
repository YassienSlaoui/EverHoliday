import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
           

        }
        

    }

    // step 3
    
    render() {
        
        return (
            <div>
            <div className = "row" style={{padding:"10px"}}>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={require("components/Home/vacacion3.jpg").default}
                        alt="First slide"
                        style={{height: "100%"}}
                        />
                        <Carousel.Caption style={{bottom:"20%"}}>
                        <h1 style={{color:"#007bff",fontSize:"70px"}}>Welcome to EverHoliday </h1>
                        <p style={{color:"#007bff",fontSize:"23px"}}>Get started on your vacation planning by exploring EverHoliday</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    
                 </Carousel>
            </div>
            </div>
        )
    }
}

export default Home 