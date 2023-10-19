import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isClicked: false,
      todos: [],
      text: '',
    };
  }

  onClickHandler = () => {
    this.setState({
      ...this.state,
      isClicked: !this.setState.isClicked,
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      ...this.state,
      text: e.target.value,
    });
  };

  addTodo = (e) => {
    e.preventDefault();
    const todos = this.state.todos.slice();
    todos.push(this.state.text);

    this.setState({
      ...this.state,
      todos,
      text: '',
    });
  };

  editTodo = (idx) => {
    const todos = this.state.todos.slice();
    if (this.state.text) {
      todos.splice(idx, 1, this.state.text);
    }

    this.setState({
      ...this.state,
      todos,
      text: '',
    });
  };

  deleteTodo = (idx) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.filter((_, i) => i !== idx),
    });
  };

  dragStartHandler = (e, idx) => {
    e.dataTransfer.setData('idx', idx);
  };

  dragOverHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  dropHandler = (e, newIdx) => {
    e.preventDefault();
    const oldIdx = e.dataTransfer.getData('idx');
    const todos = this.state.todos.slice();
    const todoItem = todos[oldIdx];
    todos.splice(oldIdx, 1);
    todos.splice(newIdx, 0, todoItem);
    this.setState({
      ...this.state,
      todos,
    });
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <form onSubmit={this.addTodo}>
            <input
              type='text'
              value={this.state.text}
              onChange={this.onChangeHandler}
            ></input>
            <button>Submit</button>
          </form>
          <ul>
            {this.state.todos.map((todo, idx) => (
              <li
                draggable
                onDragStart={(e) => this.dragStartHandler(e, idx)}
                onDragOver={(e) => this.dragOverHandler(e)}
                onDrop={(e) => this.dropHandler(e, idx)}
                key={idx}
              >
                {todo} <button onClick={() => this.editTodo(idx)}>Edit</button>{' '}
                <button onClick={() => this.deleteTodo(idx)}>Delete</button>
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
