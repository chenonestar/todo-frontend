import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, openEditDialog, confirmDeleteTodo }) {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          openEditDialog={openEditDialog}
          confirmDeleteTodo={confirmDeleteTodo}
        />
      ))}
    </List>
  );
}

export default TodoList;
