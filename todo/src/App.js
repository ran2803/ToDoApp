import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import mountain from "./mountain.jpg";

function App() {
  const [task, setTask] = useState("");
  const ulRef = useRef(null);

  const handleAdd = () => {
    if (task.trim() !== "") {
      const newList = <List key={task} task={task} removeTask={() => handleRemove(task)} />;

      const newListNode = document.createElement("li");
      ReactDOM.render(newList, newListNode);

      ulRef.current.appendChild(newListNode);

      setTask("");
    }
  };

  const handleRemove = (taskToRemove) => {
    const listItems = ulRef.current.childNodes;

    listItems.forEach((item) => {
      if (item.firstChild.id === taskToRemove) {
        // Wait for a second and then remove the task
        setTimeout(() => {
          ulRef.current.removeChild(item);
        }, 1000);
      }
    });
  };

  return (
    <>
      <header>
        <img src={mountain} className="image" alt="Mountain Header" />
      </header>
      <div className="App-Container">
        <h1>To-Do List</h1>
        <input
          className="textBox"
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <ul ref={ulRef}></ul>
        <button className="add" onClick={handleAdd}>
          + Add
        </button>
      </div>
    </>
  );
}

function List({ task, removeTask }) {
  const handleCheckboxChange = () => {
    removeTask(task);
  };

  return (
    <>
      <input
        className="form-check-input me-1"
        type="checkbox"
        value=""
        id={task}
        onChange={handleCheckboxChange}
      />
      <label className="form-check-label" htmlFor={task}>
        {task}
      </label>
    </>
  );
}

export default App;
