import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter, lintGutter } from "@codemirror/lint";
import { AddCircleOutline, ContentCopy, DeleteOutline, FormatAlignLeft, Save } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Select, Tab, Tabs, Tooltip } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { basicDark, basicLight } from "@uiw/codemirror-theme-basic";
import CodeMirror from "@uiw/react-codemirror";

import { useMockStore } from "@/store/mock";
import type { MockResponseItem } from "@/types/mock";

import type { EditorTabPanelProps } from "./EditorArea.types";

function EditorTabPanel({ index, value, children }: EditorTabPanelProps) {
  return (
    <Box hidden={value !== index} sx={{ mt: 3 }}>
      {children}
    </Box>
  );
}

function EditorTab() {
  const { mode } = useColorScheme();

  const isDarkMode = mode === "dark";

  // Store
  const updateResponse = useMockStore(state => state.updateResponse);

  // Form context
  const { control, setValue, watch, getValues, setError, clearErrors } = useFormContext<MockResponseItem>();
  const { fields, update, remove, prepend } = useFieldArray({
    control,
    name: "responseList"
  });

  const [activeResponseName, requestPayload] = watch(["activeResponseName", "requestPayload"]);

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
    const { id, ...values } = getValues();

    if (fields.find(item => item.name === values.responseName) || !values.responseName.trim()) {
      setError("responseName", {
        message: values.responseName ? "Response name already exists" : "Required"
      });
      return;
    }

    clearErrors("responseName");

    prepend({ ...values, name: values.responseName, response: `{ "data": {} }` });

    setValue("responseName", values.responseName);
    setValue("activeResponseName", values.responseName);

    updateResponse({ id, ...values });
  };

  const handleSaveResponse = () => {
    const { id, ...values } = getValues();
    const currentResponseIndex = fields.findIndex(item => item.name === activeResponseName);

    if (currentResponseIndex === -1 || !activeResponseData) return;

    if (!values.responseName.trim()) {
      setError("responseName", { message: "Required" });
      return;
    }

    clearErrors("responseName");

    update(currentResponseIndex, {
      ...values,
      name: values.responseName,
      response: responseBody
    });

    setValue("activeResponseName", values.responseName);

    updateResponse({ id, ...values });
  };

  const handleChangePayload = (val: string) => {
    setValue("requestPayload", val);
  };

  const handleDeleteResponse = () => {
    if (fields.length <= 1) return;
    const currentResponseIndex = fields.findIndex(item => item.name === activeResponseName);

    remove(currentResponseIndex);

    setValue(
      "requestPayload",
      getValues(`responseList.${currentResponseIndex === 0 ? 0 : currentResponseIndex - 1}.name`)
    );
  };

  const handleSelectResponse = () => {
    if (!activeResponseData) return;

    setResponseBody(activeResponseData.response);
    setValue("responseName", activeResponseData.name);
    setValue("method", activeResponseData.method);
    setValue("status", activeResponseData.status);
    setValue("delay", activeResponseData.delay);
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
              name={"activeResponseName"}
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
          height="400px"
          maxHeight="400px"
          theme={isDarkMode ? basicDark : basicLight}
          value={responseBody}
          onChange={setResponseBody}
        ></CodeMirror>
      </EditorTabPanel>

      <EditorTabPanel index={1} value={tab}>
        <CodeMirror
          extensions={[json(), linter(jsonParseLinter()), lintGutter()]}
          height="400px"
          maxHeight="400px"
          theme={isDarkMode ? basicDark : basicLight}
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
