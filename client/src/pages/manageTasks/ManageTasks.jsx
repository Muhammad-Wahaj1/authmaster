import { useEffect, useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { createTask } from "../../api/tasks/invokeCreateTask.api";
import { TaskTable } from "../../components/taskTable/TaskTable";
import { getTasks } from "../../api/tasks/invokeGetTasks.api";

export default function ManageTasks() {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const { handleSubmit, control, reset } = useForm({
        defaultValues: { title: "" },
    });

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getTasks();
            setRowData(response.length ? response : []);
            setLoading(false);
        };
        fetchTasks();
    }, [reload]);

    const onSubmit = async (data) => {
        await createTask(data);
        reset();
        setReload(prev => !prev);
    };

    const inputFieldSX = {
        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: '#850E35',
        },
        '& .MuiInputLabel-root.MuiFormLabel-root': {
            color: '#666',
        }
    };

    return (
        <>
        <Box sx={{ p: 2 }}>
            <Typography sx={{ fontSize: "1.5rem", my: "1rem" }} >
                Manage your tasks
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", gap: 1, mb: 2, justifyContent: "center",  width: '85%',  }}
            >
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: "Task title is required",
                        validate: (value) => value.trim() !== "" || "Task title cannot be empty",
                    }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="New Task"
                            fullWidth
                            sx={inputFieldSX}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                        backgroundColor: "#850E35",
                        color: "#fff",
                        fontWeight: 700,
                        px: 3,
                        '&:hover': {
                            backgroundColor: "#a00f45",
                        },
                    }}
                >
                    Add Task
                </Button>
            </Box>
            <TaskTable rowData={rowData} loading={loading} />
        </Box>
        </>
    );
}
