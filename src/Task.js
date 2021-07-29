import React from "react";
import "./Task.css";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Task({ id, task, editTask, deleteTask }) {
  return (
    <div className="task">
      <span className="task_name">{task}</span>
      <div className="task_action">
        <FaEdit onClick={() => editTask(id)} className="edit" />
        <FaTrashAlt onClick={() => deleteTask(id)} className="trash-alt" />
      </div>
    </div>
  );
}

export default Task;
