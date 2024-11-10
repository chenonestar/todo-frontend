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
    addTodo,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm
}) {
    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
                label="搜索待办事项"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="过滤"
                select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            >
                <MenuItem value="all">全部</MenuItem>
                <MenuItem value="completed">已完成</MenuItem>
                <MenuItem value="uncompleted">未完成</MenuItem>
            </TextField>

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
