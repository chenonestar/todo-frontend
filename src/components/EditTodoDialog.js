import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function EditTodoDialog({ open, editTitle, setEditTitle, editDescription, setEditDescription, editPriority, setEditPriority, editDueDate, setEditDueDate, closeEditDialog, saveEdit }) {
  return (
    <Dialog open={open} onClose={closeEditDialog}>
      <DialogTitle>编辑待办事项</DialogTitle>
      <DialogContent>
        <TextField
          label="标题"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="描述"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="优先级"
          select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          <MenuItem value="高">高</MenuItem>
          <MenuItem value="中">中</MenuItem>
          <MenuItem value="低">低</MenuItem>
        </TextField>
        <DatePicker
          label="截止日期"
          value={editDueDate}
          onChange={(newValue) => setEditDueDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeEditDialog} color="secondary">
          取消
        </Button>
        <Button onClick={saveEdit} color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTodoDialog;
