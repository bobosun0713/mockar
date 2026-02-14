import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
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

import { useMockStore } from "@/store/mock";
import type { MockResponseItem } from "@/types/mock";

import MethodChip from "../MethodChip";

import type { EditorItemProps } from "./EditorArea.types";
import EditorItemTab from "./EditorItemTab";

function EditorItem({ item }: EditorItemProps) {
  const [open, setOpen] = useState(false);

  // Store
  const updateResponse = useMockStore(state => state.updateResponse);

  // Form
  const methods = useForm<MockResponseItem>({
    defaultValues: item
  });

  const {
    control,
    register,
    getValues,
    formState: { errors },
    watch
  } = methods;

  watch(["method", "requestCount"]);
  const [url, enabled] = watch(["url", "enabled"]);

  // Hooks
  useEffect(() => {
    const { id, ...values } = getValues();
    updateResponse({ id, ...values });
  }, [url, enabled]);

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
          <Grid size={0.5}>
            <IconButton
              sx={{ padding: 0 }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? <ExpandLess></ExpandLess> : <ExpandMore></ExpandMore>}
            </IconButton>
          </Grid>

          <Grid component="span" size={9.5}>
            <TextField
              fullWidth
              variant="standard"
              {...register("url")}
              onDoubleClick={() => {
                setOpen(!open);
              }}
            ></TextField>
          </Grid>

          <Grid size={2}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <MethodChip method={getValues("method")}></MethodChip>

              <Box>{getValues("requestCount")}</Box>

              <Controller
                control={control}
                name={"enabled"}
                render={({ field: { onChange, value } }) => <Switch checked={value} onChange={onChange}></Switch>}
              ></Controller>
            </Box>
          </Grid>
        </Grid>

        <Collapse unmountOnExit in={open} sx={{ marginTop: 4 }} timeout={0}>
          <Box sx={{ mb: 2.5 }}>
            <Grid container spacing={2}>
              <Grid size={3}>
                <TextField
                  fullWidth
                  label="Response Names *"
                  size="small"
                  {...register("responseName")}
                  error={!!errors.responseName?.message}
                  helperText={errors.responseName?.message}
                ></TextField>
              </Grid>

              <Grid size={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-chip-label">Method</InputLabel>

                  <Controller
                    control={control}
                    name={"method"}
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

              <Grid size={3}>
                <TextField fullWidth label="Status" size="small" {...register("status")}></TextField>
              </Grid>

              <Grid size={3}>
                <TextField fullWidth label="Delay (ms)" size="small" type="number" {...register("delay")}></TextField>
              </Grid>
            </Grid>
          </Box>

          <FormProvider {...methods}>
            <EditorItemTab></EditorItemTab>
          </FormProvider>
        </Collapse>
      </Box>
    </Paper>
  );
}

export default EditorItem;
