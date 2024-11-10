import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TodoItem({ todo, toggleComplete, openEditDialog, confirmDeleteTodo }) {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit" onClick={() => openEditDialog(todo)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => confirmDeleteTodo(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <Checkbox checked={todo.completed} onChange={() => toggleComplete(todo)} />
      <ListItemText
        primary={`${todo.title} (优先级: ${todo.priority})`}
        secondary={`描述: ${todo.description}${todo.dueDate ? `, 截止日期: ${new Date(todo.dueDate).toLocaleDateString()}` : ''}`}
      />
    </ListItem>
  );
}

export default TodoItem;
