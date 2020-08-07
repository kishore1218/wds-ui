import React from "react";
import {Link} from "react-router-dom";

class QuickLink extends React.Component{

    constructor(props){
        super(props);
        this.props=props;
    }

    render(){
        return(    
        <div className="col-lg-3">
                <Link to={this.props.path}>    
                <div className={this.props.paneltype}>
                    <div className="card-body">
                          
                        <h2 class="card-text"><i className={this.props.classtype}></i></h2>    
                        <h5 className="card-title">{this.props.quicklink}</h5>                  
                    </div>
                </div>
                </Link>
            </div>
        )
    }
}
export default QuickLink;