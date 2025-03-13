import React from "react";

const TodoInput = ({ newTodo, handleInputChange, handleAddTodo }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        name="title"
        placeholder="Enter Task Name"
        value={newTodo.title}
        onChange={handleInputChange}
      />

      <div className="status-container">
        <label>
          <input
            type="radio"
            name="completed"
            value="false"
            checked={!newTodo.completed}
            onChange={handleInputChange}
          />
          ❌ Not Completed
        </label>

        <label>
          <input
            type="radio"
            name="completed"
            value="true"
            checked={newTodo.completed}
            onChange={handleInputChange}
          />
          ✅ Completed
        </label>
      </div>

      <button onClick={handleAddTodo}>
        {newTodo.id ? "✏️ Update Task" : "➕ Add Task"}
      </button>
    </div>
  );
};

export default TodoInput;
