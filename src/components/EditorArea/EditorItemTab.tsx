import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter, lintGutter } from "@codemirror/lint";
import { AddCircleOutline, ContentCopy, DeleteOutline, FormatAlignLeft, Save } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Select, Tab, Tabs, Tooltip } from "@mui/material";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";

import type { EditorFormData, EditorTabPanelProps, EditorTabProps } from "./EditorArea.types";

function EditorTabPanel(props: EditorTabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box hidden={value !== index} sx={{ mt: 3 }} {...other}>
      {children}
    </Box>
  );
}

function EditorTab({ index = 0 }: EditorTabProps) {
  // Form context
  const { control, setValue, watch, getValues, setError, clearErrors } = useFormContext<EditorFormData>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: `items.${index}.responseList`
  });

  const [activeResponseName, requestPayload] = watch([
    `items.${index}.activeResponseName`,
    `items.${index}.requestPayload`
  ]);

  const activeResponseData = useMemo(() => {
    return fields.find(item => item.name === activeResponseName);
  }, [fields, activeResponseName]);

  const [tab, setTab] = useState(0);
  const [responseBody, setResponseBody] = useState(fields[0]?.response || "");

  // Methods
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeResponseData?.response ?? "");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNewResponse = () => {
    const { responseName, method, status, delay } = getValues(`items.${index}`);

    if (fields.find(item => item.name === responseName) || !responseName.trim()) {
      setError(`items.${index}.responseName`, {
        message: responseName ? "Response name already exists" : "Required"
      });
      return;
    }

    clearErrors(`items.${index}.responseName`);

    append({ name: responseName, method, status, delay, response: `{ "data": {} }` });
    setValue(`items.${index}.responseName`, responseName);
    setValue(`items.${index}.activeResponseName`, responseName);
  };

  const handleSaveResponse = () => {
    const { responseName, method, status, delay } = getValues(`items.${index}`);
    const currentResponseIndex = fields.findIndex(item => item.name === activeResponseName);

    if (currentResponseIndex === -1 || !activeResponseData) return;

    if (!responseName.trim()) {
      setError(`items.${index}.responseName`, { message: "Required" });
      return;
    }

    clearErrors(`items.${index}.responseName`);

    update(currentResponseIndex, {
      name: responseName,
      method: method,
      status: status,
      delay: delay,
      response: responseBody
    });

    setValue(`items.${index}.activeResponseName`, responseName);
  };

  const handleChangePayload = (val: string) => {
    setValue(`items.${index}.requestPayload`, val);
  };

  const handleDeleteResponse = () => {
    if (fields.length <= 1) return;
    const currentResponseIndex = fields.findIndex(item => item.name === activeResponseName);

    remove(currentResponseIndex);

    setValue(
      `items.${index}.activeResponseName`,
      getValues(`items.${index}.responseList.${currentResponseIndex === 0 ? 0 : currentResponseIndex - 1}.name`)
    );
  };

  const handleSelectResponse = () => {
    if (!activeResponseData) return;

    setResponseBody(activeResponseData.response);
    setValue(`items.${index}.responseName`, activeResponseData.name);
    setValue(`items.${index}.method`, activeResponseData.method);
    setValue(`items.${index}.status`, activeResponseData.status);
    setValue(`items.${index}.delay`, activeResponseData.delay);
  };

  const handleFormat = (val: string, fn: (val: string) => void) => {
    try {
      const parsedObj = JSON.parse(val) as Record<string, unknown>;
      const formattedJson = JSON.stringify(parsedObj, null, 2);
      fn(formattedJson);
    } catch (err) {
      console.error(err);
    }
  };

  // Hooks
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleSelectResponse();
  }, [activeResponseName]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Tabs value={tab}>
          <Tab
            label="Response Body"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setTab(0);
            }}
          ></Tab>

          <Tab
            label="Request Payload"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setTab(1);
            }}
          ></Tab>

          <Tab
            label="Headers"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setTab(2);
            }}
          ></Tab>
        </Tabs>

        {tab === 0 ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Controller
              control={control}
              name={`items.${index}.activeResponseName`}
              render={({ field }) => (
                <Select {...field} size="small" sx={{ width: 350 }}>
                  {fields.map(field => (
                    <MenuItem key={field.id} value={field.name}>
                      {field.name + " | " + field.method + " | " + field.status}
                    </MenuItem>
                  ))}
                </Select>
              )}
            ></Controller>

            <Tooltip title="Save">
              <IconButton size="small" onClick={handleSaveResponse}>
                <Save></Save>
              </IconButton>
            </Tooltip>

            <Tooltip title="Format content">
              <IconButton
                size="small"
                onClick={() => {
                  handleFormat(responseBody, setResponseBody);
                }}
              >
                <FormatAlignLeft></FormatAlignLeft>
              </IconButton>
            </Tooltip>

            <Tooltip title="Copy content">
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopy></ContentCopy>
              </IconButton>
            </Tooltip>

            <Tooltip title="Add new response">
              <IconButton size="small" onClick={handleAddNewResponse}>
                <AddCircleOutline></AddCircleOutline>
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete this response">
              <IconButton size="small" onClick={handleDeleteResponse}>
                <DeleteOutline></DeleteOutline>
              </IconButton>
            </Tooltip>
          </Box>
        ) : tab === 1 ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Tooltip title="Format content">
              <IconButton
                size="small"
                onClick={() => {
                  handleFormat(requestPayload, handleChangePayload);
                }}
              >
                <FormatAlignLeft></FormatAlignLeft>
              </IconButton>
            </Tooltip>

            <Tooltip title="Copy content">
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopy></ContentCopy>
              </IconButton>
            </Tooltip>
          </Box>
        ) : null}
      </Box>

      <EditorTabPanel index={0} value={tab}>
        <CodeMirror
          extensions={[json(), linter(jsonParseLinter()), lintGutter()]}
          theme={vscodeDark}
          value={responseBody}
          onChange={setResponseBody}
        ></CodeMirror>
      </EditorTabPanel>

      <EditorTabPanel index={1} value={tab}>
        <CodeMirror
          extensions={[json(), linter(jsonParseLinter()), lintGutter()]}
          theme={vscodeDark}
          value={requestPayload}
          onChange={val => {
            handleChangePayload(val);
          }}
        ></CodeMirror>
      </EditorTabPanel>

      <EditorTabPanel index={2} value={tab}>
        Coming soon...
      </EditorTabPanel>
    </Box>
  );
}

export default EditorTab;
