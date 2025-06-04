import { Edit2Icon, SaveIcon, Trash2Icon } from "lucide-react";
import "../App.css";
import type { Todo } from "../types/todo";

interface TodoList {
  onDelete: (id: number) => void;
  todos: Todo[];
  onToggle: (id: number) => void;
  editingId: number | null;
  editingText: string;
  onEditStart: (id: number, text: string) => void;
  onEditChange: (text: string) => void;
  onEditCancel: () => void;
  onEditSave: (id: number) => void;
}

const TodoList = ({
  onDelete,
  todos,
  onToggle,
  editingId,
  editingText,
  onEditCancel,
  onEditChange,
  onEditSave,
  onEditStart,
}: TodoList) => {
  if (todos.length === 0) return <p className="empty">No tasks yet! 🎉</p>;
  return (
    <ul className="list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`listItem ${todo.completed ? "completed" : ""}`}
        >
          <div className="leftSection">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="checkbox"
            />
            {editingId === todo.id ? (
              <input
                className="editInput"
                value={editingText}
                onChange={(e) => onEditChange(e.target.value)}
                autoFocus
              />
            ) : (
              <span className={`todoText ${todo.completed ? "completed" : ""}`}>
                {todo.text}
              </span>
            )}
          </div>
          <div className="rightSection">
            {editingId === todo.id ? (
              <>
                <button
                  className="saveButton"
                  onClick={() => onEditSave(todo.id)}
                >
                  <SaveIcon />
                </button>
                <button className="deleteButton" onClick={onEditCancel}>
                  ❌
                </button>
              </>
            ) : (
              <>
                <button
                  className="editButton"
                  onClick={() => onEditStart(todo.id, todo.text)}
                >
                  <Edit2Icon />
                </button>
                <button
                  className="deleteButton"
                  onClick={() => onDelete(todo.id)}
                >
                  <Trash2Icon />
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
