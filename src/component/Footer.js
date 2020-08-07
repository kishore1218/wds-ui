import React from "react";
import ReactDOM from "react-dom";

const Footer=()=>{
    return(
    <div class="d-flex flex-column min-vh-100">   
    <div class="wrapper flex-grow-1"></div>
        <footer className="page-footer font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <hr className="clearfix w-100 d-md-none pb-3"/>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <a href="https://mdbootstrap.com/education/bootstrap/"> www.cloudberrie.com</a>
            </div>
            <div class="text-center center-block">
                <br />
                    <a href="#"><i class="fa fa-facebook-square fa-3x social text-info"></i></a>
                    <a href="#"><i class="fa fa-envelope-square fa-3x social text-success"></i></a>
                    <a href="#"><i class="fa fa-twitter-square fa-3x social text-primary"></i></a>
                    <a href="#"><i class="fa fa-google-plus-square fa-3x social text-warning"></i></a>
            </div>

        </footer>
     </div>);
};

export default Footer;