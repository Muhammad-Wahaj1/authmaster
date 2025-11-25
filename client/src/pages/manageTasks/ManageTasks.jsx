import { useEffect } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../api/tasks/invokeCreateTask.api";
import { TaskTable } from "../../components/taskTable/TaskTable";
import { addTaskLocal, fetchTasks } from "../../../../server/redux/slices/taskSlice";

export default function ManageTasks() {
    const dispatch = useDispatch();

    const rowData = useSelector((state) => state.tasks.list);
    const loading = useSelector((state) => state.tasks.loading);

    const { handleSubmit, control, reset } = useForm({ defaultValues: { title: "" } });

    useEffect(() => {
        if (rowData.length === 0) {
            dispatch(fetchTasks());
        }
    }, [dispatch, rowData.length]);

    const onSubmit = async (data) => {
        const newTask = await createTask(data);

        dispatch(addTaskLocal(newTask));

        reset();
    };

    const inputFieldSX = {
        "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#850E35" },
        "& .MuiInputLabel-root.MuiFormLabel-root": { color: "#666" },
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography sx={{ fontSize: "1.5rem", my: "1rem", textAlign: "center" }}>
                Manage your tasks
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: "flex",
                    gap: 1,
                    mb: 2,
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: "Task title is required",
                        validate: (v) => v.trim() !== "" || "Task title cannot be empty",
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
                        "&:hover": { backgroundColor: "#a00f45" },
                    }}
                >
                    Add Task
                </Button>
            </Box>

            <TaskTable rowData={rowData} loading={loading} />
        </Box>
    );
}
