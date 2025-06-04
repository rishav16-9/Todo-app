import { useState, useEffect } from "react";
import "./App.css";
import { PlusIcon } from "lucide-react";
import { generateRandomNumber } from "./utils";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      {
        id: generateRandomNumber(),
        text: input.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditStart = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleEditChange = (text: string) => {
    setEditingText(text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleEditSave = (id: number) => {
    if (!editingText.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">My Todo List</h1>
        <p className="subtitle">Organize your day with us</p>
      </div>
      <form className="form" onSubmit={addTodo}>
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="addButton" type="submit">
          <PlusIcon />
          Add
        </button>
      </form>
      <TodoList
        onDelete={deleteTodo}
        todos={todos}
        onToggle={toggleTodo}
        editingId={editingId}
        editingText={editingText}
        onEditStart={handleEditStart}
        onEditChange={handleEditChange}
        onEditCancel={handleEditCancel}
        onEditSave={handleEditSave}
      />
    </div>
  );
}
