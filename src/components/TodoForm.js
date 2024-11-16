import React from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function TodoForm({
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    addTodo
}) {
    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
                label="待办事项标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="描述"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="优先级"
                select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
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
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Button onClick={addTodo} variant="contained" color="primary" size="large">
                    添加待办事项
                </Button>
            </Box>
        </Box>
    );
}

export default TodoForm;
