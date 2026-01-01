import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField
} from "@mui/material";

import MethodChip from "../MethodChip";

import type { EditorFormData, EditorItemProps } from "./EditorArea.types";
import EditorItemTab from "./EditorItemTab";

function EditorItem({ index = 0 }: EditorItemProps) {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    getValues,
    watch,
    formState: { errors }
  } = useFormContext<EditorFormData>();

  watch([`items.${index}.label`, `items.${index}.method`]);

  return (
    <Paper elevation={1}>
      <Box
        sx={{
          padding: "28px 16px",
          borderBottom: 1,
          borderColor: theme => theme.palette.divider
        }}
      >
        <Grid container spacing={2} sx={{ width: "100%", placeItems: "center", textAlign: "center" }}>
          <Grid component="span" size={9.5}>
            <TextField
              fullWidth
              label={getValues(`items.${index}.label`) || "URL"}
              variant="standard"
              {...register(`items.${index}.url`)}
              onDoubleClick={() => {
                setOpen(!open);
              }}
            ></TextField>
          </Grid>

          <Grid size={2.5}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <MethodChip method={getValues(`items.${index}.method`)}></MethodChip>

              <Box>{getValues(`items.${index}.requestCount`)}</Box>

              <Controller
                control={control}
                name={`items.${index}.enabled`}
                render={({ field: { onChange, value } }) => <Switch checked={value} onChange={onChange}></Switch>}
              ></Controller>

              <IconButton
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open ? <ExpandLess></ExpandLess> : <ExpandMore></ExpandMore>}
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Collapse unmountOnExit in={open} sx={{ marginTop: 4 }} timeout={0}>
          <Box>
            <Grid container spacing={2}>
              <Grid size={3}>
                <TextField fullWidth label="Label" size="small" {...register(`items.${index}.label`)}></TextField>
              </Grid>

              <Grid size={3}>
                <TextField
                  fullWidth
                  label="Response Names *"
                  size="small"
                  {...register(`items.${index}.responseName`)}
                  error={!!errors.items?.[index]?.responseName?.message}
                  helperText={errors.items?.[index]?.responseName?.message}
                ></TextField>
              </Grid>

              <Grid size={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-chip-label">Method</InputLabel>

                  <Controller
                    control={control}
                    name={`items.${index}.method`}
                    render={({ field }) => (
                      <Select {...field} label="Method" labelId="demo-multiple-chip-label" size="small">
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                        <MenuItem value="PUT">PUT</MenuItem>
                        <MenuItem value="PATCH">PATCH</MenuItem>
                        <MenuItem value="DELETE">DELETE</MenuItem>
                      </Select>
                    )}
                  ></Controller>
                </FormControl>
              </Grid>

              <Grid size={2}>
                <TextField fullWidth label="Status" size="small" {...register(`items.${index}.status`)}></TextField>
              </Grid>

              <Grid size={2}>
                <TextField
                  fullWidth
                  label="Delay (ms)"
                  size="small"
                  type="number"
                  {...register(`items.${index}.delay`)}
                ></TextField>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2.5 }}></Divider>

          <EditorItemTab index={index}></EditorItemTab>
        </Collapse>
      </Box>
    </Paper>
  );
}

export default EditorItem;
