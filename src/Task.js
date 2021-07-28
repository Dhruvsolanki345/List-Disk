import React from "react";
import "./Task.css";

function Task({ id, task, editTask, deleteTask }) {
  return (
    <div className="task">
      <span className="task_name">{task}</span>
      <div className="task_action">
        <i onClick={() => editTask(id)} className="fas fa-edit" />
        <i onClick={() => deleteTask(id)} className="fas fa-trash-alt" />
      </div>
    </div>
  );
}

export default Task;
