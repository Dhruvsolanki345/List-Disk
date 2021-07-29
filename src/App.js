import React, { useState, useEffect } from "react";
import Task from "./Task";
import "./App.css";
import todo_image from "./images/todo-image.jpg";
import { nanoid } from "nanoid";
import { FaEdit, FaPlus } from 'react-icons/fa';

function App() {
  const [input, setInput] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todoList")) || []);
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todoList);
    localStorage.setItem("todoList", json);
  }, [todoList]);

  const editTask = (id) => {
    setIsEdit(true);
    setEditId(id);
    setInput(todoList.find((item) => item.id === id).task);
  };

  const editInputTask = () => {
    const newTodoList = todoList.map((item) => {
      if (item.id === editId) item.task = input;
      return item;
    });
    setIsEdit(false);
    setTodoList(newTodoList);
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const addEditTask = (e) => {
    e.preventDefault();

    if (input.trim().length) {
      if (isEdit) {
        editInputTask();
      } else {
        const item = {
          id: nanoid(),
          task: input.trim(),
        };
        setTodoList([...todoList, item]);
      }
      setIsErr(false);
    } else {
      setIsErr(true);
    }
    setInput("");
  };

  return (
    <div className="app">
      <div className="container">
        <img className="todo_logo" src={todo_image} alt="todo logo" />
        <div className="title">Add Your Task Here &#9996; </div>
        <div className="add_container">
          <form className="add_item">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="&#9997; Add Task"
            />
            <button
              onClick={addEditTask}
              type="submit"
              className={isEdit ? "edit_btn" : "add_btn"}
            >{ isEdit ? <FaEdit /> : <FaPlus /> }</button>
          </form>
          <div className="input_err">{isErr && "Input can't be blank"}</div>
        </div>
        <div className="todo_list">
          {todoList.map((item) => (
            <Task
              key={item.id}
              id={item.id}
              task={item.task}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
        <button
          onClick={(e) => (todoList.length ? setTodoList([]) : addEditTask(e))}
          className="remove_all_btn"
        >
          {todoList.length ? "Remove All" : "Add Task"}
        </button>
      </div>
    </div>
  );
}

export default App;
