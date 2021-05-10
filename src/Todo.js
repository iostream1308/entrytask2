import React from 'react';
class Todo extends React.Component{
  
  constructor(props){
    
    super(props);
    var dataString = localStorage.getItem('todoList');
    var dataStatus = localStorage.getItem('statusList');
    this.state = {
      note: "",
      list_of_notes: (dataString?JSON.parse(dataString): []),
      status: (dataStatus?JSON.parse(dataStatus): []),
      poslist: 0,
      textinp: "",
    };
    
  }

  mySubmitHandler = (event) => {
    event.preventDefault()
    let newList = this.state.list_of_notes
    newList.push(this.state.note);
    let newStatus = this.state.status
    newStatus.push(0)
    this.setState({
      list_of_notes: newList,
      status: newStatus,
      textinp: "",
    })
    localStorage.setItem('todoList', JSON.stringify(this.state.list_of_notes));
    localStorage.setItem('statusList', JSON.stringify(this.state.status));
  }

  myChangeHandler = (event) => {
    event.preventDefault()
    this.setState({
      textinp: event.target.value,
      note: event.target.value,
    })
    
  }

  handleClick = (event) => {
    event.preventDefault()
    let newList = this.state.list_of_notes;
    newList.push(this.state.note)
    let newStatus = this.state.status
    newStatus.push(0);
    this.setState({
      list_of_notes: newList,
      status: newStatus,
      textinp: "",
    })
    localStorage.setItem('todoList', JSON.stringify(this.state.list_of_notes));
    localStorage.setItem('statusList', JSON.stringify(this.state.status));
  }
  checkedlist = (index) => {
    let newStatus = this.state.status;
     if(!newStatus[index]) {
      newStatus[index] = 1;
     }
     else {
      newStatus[index] = 0;
     }
     this.setState({ status: newStatus})
     localStorage.setItem('todoList', JSON.stringify(this.state.list_of_notes));
     localStorage.setItem('statusList', JSON.stringify(this.state.status));
  }
  markActive = (event) => {
    event.preventDefault()
    this.setState({
      poslist: 1
    })
  }  
  markComplete = (event) => {
    event.preventDefault()
    this.setState({
      poslist: 2
    })
  }
  markAll = (event) => {
    event.preventDefault()
    this.setState({
      poslist: 0
    })
  }
  ClearList = (event) => {
    event.preventDefault()
    this.setState({
      list_of_notes: [],
      status: [],
    })
    localStorage.clear();
  }
  showlist() {
    if (this.state.poslist === 0) {
      return this.state.list_of_notes.map((todo, index) => {
        if(!this.state.status[index]) {
          return <li key={index}> <input  type="checkbox" checked={this.state.status[index]} onChange={() => this.checkedlist(index)} /> {todo} </li >
        }
        else
          return <li key={index}> <input type="checkbox" checked={this.state.status[index]} onChange={() => this.checkedlist(index)} /> {todo} </li >
      })
    }
    else {
      if (this.state.poslist === 1) {
        return this.state.list_of_notes.map((todo, index) => {
          if(!this.state.status[index]) {
            return <li key={index}> <input type="checkbox" checked={this.state.status[index]} onChange={() => this.checkedlist(index)} /> {todo} </li >
          }
          return null
        })
      }
      else {
        return this.state.list_of_notes.map((todo, index) => {
          if(this.state.status[index]) {
            return <li key={index}> <input type="checkbox" checked={this.state.status[index]} onChange={() => this.checkedlist(index)} /> {todo} </li >
          }
          return null
        })
      }
    }
    
  }
  render() {
    const mystyle={
      margin: "auto",
      width: "50%",
      top: "50%",
      border: "3px solid #",
      padding: "10px",
    }  
     
    return (
        <center style={mystyle}>
          <form onSubmit={this.mySubmitHandler}>
            <h1>Notes</h1>
            <p>Enter your note:</p>
              <input id="input" className="form-control" required="required" type="text" value={this.state.textinp} onChange={this.myChangeHandler}></input>
              <button type="button" className="btn btn-info" onClick={this.handleClick}>submit</button>
              <ul >  {this.showlist()} </ul>
          </form>
          <button type="button" className="btn btn-info" onClick={this.markAll}>All</button>
          <button type="button" className="btn btn-info" onClick={this.markActive}>active</button>
          <button type="button" className="btn btn-info" onClick={this.markComplete}>completed</button>
          <hr />
          <button type="button" className="btn btn-info" onClick={this.ClearList}>clear</button>
        </center>
    );
  }
}
export default Todo;
