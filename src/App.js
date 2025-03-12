import React, { useEffect, useState } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        const limitedData = data.slice(0, 5);
        setTodos(limitedData);
        setFilteredTodos(limitedData);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: name === "completed" ? value === "true" : value });
  };

  const handleAddTodo = () => {
    if (!newTodo.title) {
      alert("Title is required!");
      return;
    }

    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const updatedTodos = [...todos, { id: newId, ...newTodo }];
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    setNewTodo({ title: "", completed: false });
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    const newTitle = prompt("Enter new title:");
    if (newTitle) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
    }
  };

  const handleSearch = () => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  return (
    <div className="back-container">
    <div className="container">
      <h1>To-Do List</h1>

      {/* Input Fields */}
      <div className="input-container">
        <input
          type="text"
          name="title"
          placeholder="Enter Task Name"
          value={newTodo.title}
          onChange={handleInputChange}
        />
        <select name="completed" value={newTodo.completed} onChange={handleInputChange}>
          <option value="false">❌ Not Completed</option>
          <option value="true">✅ Completed</option>
        </select>
        <button onClick={handleAddTodo}>➕ Add Task</button>
        <div className="search-container">
        <input
          type="text"
          placeholder="Search Task"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>
      </div>
      </div>

      {/* Table */}
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
      {filteredTodos.map((todo, index) => (
        <tr key={todo.id} className={index % 2 === 0 ? "even" : "odd"}>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          <td>{todo.completed ? "✅ Completed" : "❌ Not Completed"}</td>
          <td>
            <button className="edit-btn" onClick={() => handleEdit(todo.id)}>✏️ Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(todo.id)}>🗑 Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default App;
