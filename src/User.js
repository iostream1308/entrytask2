import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios';

class User extends React.Component {
  constructor(){
    super();
    this.state={
      users:[]
     }
    }
 componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users').then(userid=>{
         this.setState({
           users: userid.data
         });
     });
     console.log("???")
  }
render() {
    return (
      <Router>
        <div>
          <div className="Header">
            <ul>{this.state.users.map((user)=>(
                <li key={user.id}>
                    <Link to={"/users/"+user.id+"/"}>{"user"+user.id}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <center>
            {this.state.users.map((user)=>(
                <Route key={user.id} path={"/users/"+user.id+"/"} exact>
                  <div>
                    <h1 className="name"> { user.name } </h1>
                    <p className="username"> { user.username } </p>
                    <h2 className="company"> { user.company.name } </h2>
                    <p className="email"> Email: { user.email } </p>
                    <p className="address">
                        Address: { user.address.street+", "+user.address.suite+", "+user.address.city+", "+user.address.zipcode }
                    </p>
                    <p className="phone">Phone: { user.phone }</p>  
                    <p className="website"> Website: { user.website } </p>
                </div>
                </Route>
              ))}
          </center>
        </div>
      </Router>
    );
}
  
}

export default User;