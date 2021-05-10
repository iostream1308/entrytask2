import React from 'react';
import Todo from './Todo';
import User from './User';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

const todoList = () => <Todo />;
const userid = () => <User />;

function App() {
  return (
    <Router>
        <center>
            <li>
              <Link to="/todo-list/">Todo-List</Link>
            </li>
            <li>
              <Link to="/users/">users</Link>
            </li>
        </center>
        <Route path="/todo-list/" exact component={todoList} />
        <Route path="/users/" exact component={userid} />
    </Router>
  );
}

export default App;
