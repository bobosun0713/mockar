import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import type { EditorFormData } from "./EditorArea.types";
import EditorItem from "./EditorItem";

function EditorArea() {
  const methods = useForm<EditorFormData>({
    defaultValues: {
      items: [
        {
          url: "",
          label: "",
          method: "GET",
          status: "200",
          delay: "50",
          enabled: true,
          requestCount: 0,
          requestPayload: "{}",
          responseList: [
            { name: "New Response 1", method: "GET", status: "200", delay: "10", response: `{ "data": {} }` }
          ],
          responseName: "New Response 1",
          activeResponseName: "New Response 1"
        }
      ]
    }
  });

  const { fields } = useFieldArray({ control: methods.control, name: "items" });

  return (
    <FormProvider {...methods}>
      {fields.map((field, index) => (
        <EditorItem key={field.id} index={index}></EditorItem>
      ))}
    </FormProvider>
  );
}

export default EditorArea;
