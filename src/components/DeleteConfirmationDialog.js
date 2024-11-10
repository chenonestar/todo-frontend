import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function DeleteConfirmationDialog({ open, handleDeleteCancel, handleDeleteConfirm }) {
  return (
    <Dialog open={open} onClose={handleDeleteCancel}>
      <DialogTitle>确认删除</DialogTitle>
      <DialogContent>您确定要删除此待办事项吗？</DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCancel} color="secondary">
          取消
        </Button>
        <Button onClick={handleDeleteConfirm} color="primary">
          删除
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
