import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

import { useMockStore } from "@/store/mock";

import type { AddProjectDialogProps, AddProjectForm } from "./AddProjectDialog.types";

function AddProjectDialog({ open = false, onToggleAddDialog }: AddProjectDialogProps) {
  const { mocks, setProject } = useMockStore();

  const {
    register,
    getValues,
    setError,
    reset,
    formState: { errors }
  } = useForm<AddProjectForm>({
    defaultValues: {
      project: ""
    }
  });

  const handleAddProject = (): void => {
    const newProject = getValues("project");

    if (!newProject.trim()) {
      setError("project", { message: "Required" });
      return;
    }

    if (mocks.find(mock => mock.name === newProject)) {
      setError("project", { message: "Duplicate Project" });
      return;
    }

    setProject(newProject);
    onToggleAddDialog?.();
  };

  useEffect(() => {
    reset();
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent dividers sx={{ width: 300 }}>
        <TextField
          {...register("project")}
          fullWidth
          error={!!errors.project?.message}
          helperText={errors.project?.message}
          placeholder="Project Name"
          size="small"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
          variant="text"
          onClick={onToggleAddDialog}
        >
          Cancel
        </Button>

        <Button
          sx={{ color: theme => (theme.palette.mode === "light" ? "black" : "white") }}
          variant="text"
          onClick={handleAddProject}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProjectDialog;
