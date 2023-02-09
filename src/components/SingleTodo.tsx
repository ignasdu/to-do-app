import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { FaPencilAlt, FaTrash, FaCheckCircle } from "react-icons/fa";
import "./styles.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

//single to-do entry//

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);


  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };



  //functionality on the delete icon//
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };



  //functionality on the edit icon//

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );

    setEdit(false);
  };




  //functionality on the edit button, so that once pressed, there would be no need to click once again on the editing field to mark the text//

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);



  
  return (
    <form className="todos_single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos_single--text"
        />
      ) : todo.isDone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : (
        <span className="todos_single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <FaPencilAlt />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <FaTrash />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <FaCheckCircle />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
