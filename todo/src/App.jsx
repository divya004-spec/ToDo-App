// App.jsx
import React from 'react';
import TodoList from './components/TodoList';
import { useState, useRef } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const addTodo = () => {
    const data = inputRef.current?.value?.trim();
    if (!data) return;
    const todo = {
      text: data,
      id: Date.now(),
      inCompleted: false,
    };
    setTodos([...todos, todo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((value) => value.id !== id);
    });
  };

  const updateTodo = (id) => {
    const newData = prompt("Update your task:", "");
    if (newData?.trim() === "") return;

    setTodos((prev) => {
      return prev.map((value) => {
        if (value.id === id) {
          value.text = newData;
        }
        return value;
      });
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 flex-col gap-y-6 p-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Todo List App</h1>
      <div className="flex gap-x-2 w-full max-w-md">
        <input
          type="text"
          className="h-12 w-full border rounded-lg px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Add a new task"
          ref={inputRef}
        />
        <button
          className="bg-blue-600 text-white h-12 px-4 rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <div className="h-96 w-full max-w-md bg-white rounded-lg shadow-lg overflow-y-auto p-4 mt-4">
        {todos.length > 0 ? (
          todos.map((value) => (
            <TodoList
              text={value.text}
              key={value.id}
              id={value.id}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No tasks added yet!</p>
        )}
      </div>
    </div>
  );
};

export default App;
