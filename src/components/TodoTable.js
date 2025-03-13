import React from "react";

const TodoTable = ({ todos, handleEdit, confirmDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id} className={index % 2 === 0 ? "even" : "odd"}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? "✅ Completed" : "❌ Not Completed"}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(todo.id)}>
                  ✏️ Edit
                </button>
                <button className="delete-btn" onClick={() => confirmDelete(todo.id)}>
                  🗑 Delete
                </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
