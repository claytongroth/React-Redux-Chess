import React from 'react';

const Header = () => {
    return ( 
        <div id="main" className="row" style={{paddingTop: 10}}>
            <div className="col-lg-4 col-md-4 col-sm-4 boardside no-gutters ">
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 boardside no-gutters border border-secondary">
                <h1 style={{ marginTop:10 }}>React Redux Chess</h1>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 boardside no-gutters ">
                <div style={{display: "flex", marginTop: 20, marginBottom: 10}}>
                    <div style={{color: "#343a40"}}>Username: <input style={{borderRadius: 5, background: "#ffffc3", width: "60%"}} ></input></div>
                    <div style={{color: "#343a40", marginLeft: 5 }}>Password: <input style={{borderRadius: 5, background: "#ffffc3", width: "60%"}} ></input></div>
                    
                </div>
                <div style={{display: "flex", flexDirection: "row-reverse", marginTop: 10, marginBottom: 10}}>
                    <button className="signup">Sign Up</button>
                    <button className="login">Login</button>
                </div>
                <p>Welcome, USER_NAME</p>
            </div>
        </div>
    );
}
 
export default Header;