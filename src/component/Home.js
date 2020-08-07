import React from "react";
import ReactDOM from "react-dom";
import Header from './Header.js';
import Footer from './Footer.js';
import banner from '../banner.jpeg';

class Home extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
                 <div>
                     <Header/>


                     <div className="jumbotron ">
                        {/* <div className="container  "> */}
                        <div className="row">  
                            <div className="col-lg-4   " >
                            <h1>Art and Music Just best way to spend quality time </h1>
                            </div>
                            <div className="col-lg-4" >
                            {/* <img src={banner} className="img-responsive" alt=""/> */}
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="container text-center">    
                        
                        <div className="row">
                            <div className="col-sm-4">
                            {/* <i class="fa fa-user-md fa-5x text-danger" aria-hidden="true"></i>
                            <a href="#" className="text-danger">
                            <p>Find Doctor</p></a> */}
                            </div>
                            <div className="col-sm-4"> 
                            {/* <a href="#" className="text-success">
                                <i class="fa fa-calendar fa-5x " aria-hidden="true"></i>
                                <p>Book Appointment</p>    
                            </a> */}
                            </div>  
                            <div className="col-sm-4 text-info"> 
                            {/* <i class="fa fa-phone-square fa-5x " aria-hidden="true"></i>
                            <a href="#" className="text-info">
                                <p>Contact us</p>   
                            </a>  */}
                            </div>     
                        </div>
                    </div><br/>
                     <Footer/>
                 </div>
        );
    }
}
export default Home;