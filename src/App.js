import React, { useEffect, useState } from "react";
import "./App.css";
import TodoTable from "./components/TodoTable";
import TodoInput from "./components/TodoInput";
import SearchBar from "./components/SearchBar";
import DeleteConfirmation from "./components/DeleteConfirmation";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);


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
      showFlashMessage("Title is required!", "error");
      return;
    }
  
    if (newTodo.id) {
      const updatedTodos = todos.map((todo) =>
        todo.id === newTodo.id ? newTodo : todo
      );
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      showFlashMessage("To-Do updated successfully!", "success");
    } else {
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      const updatedTodos = [...todos, { id: newId, ...newTodo }];
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      showFlashMessage("To-Do added successfully!", "success");
    }
  
    setNewTodo({ title: "", completed: false });
  };  
  

  const confirmDelete = (id) => {
    console.log("Deleting ID:", id); // Debugging check
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  

  const handleDelete = () => {
    if (deleteId) {
      const updatedTodos = todos.filter((todo) => todo.id !== deleteId);
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
      showFlashMessage("To-Do deleted successfully!", "success");
    }
    setShowDeleteModal(false);
  };  

  const showFlashMessage = (message, type = "success") => {
    setFlashMessage({ message, type });
  
    // Hide message after 3 seconds
    setTimeout(() => {
      setFlashMessage(null);
    }, 3000);
  };
  

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setNewTodo({ ...todoToEdit }); // Populate the input fields with existing data
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
      {flashMessage && (
  <div className={`flash-message ${flashMessage.type}`}>
    {flashMessage.message}
  </div>
)}
        <h1>To-Do List</h1>
        <TodoInput newTodo={newTodo} handleInputChange={handleInputChange} handleAddTodo={handleAddTodo} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      </div>
      <TodoTable todos={filteredTodos} handleEdit={handleEdit} confirmDelete={confirmDelete} />
      <DeleteConfirmation show={showDeleteModal} onCancel={() => setShowDeleteModal(false)} onConfirm={handleDelete} />
    </div>
  );
}

export default App;
