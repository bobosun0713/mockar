import { useMemo } from "react";

import { useMockStore } from "@/store/mock";

import EditorItem from "./EditorItem";

function EditorArea() {
  // Store
  const mocks = useMockStore(state => state.mocks);
  const selectedMock = useMockStore(state => state.selectedMock);

  const filteredMocks = useMemo(
    () => mocks.find(mock => mock.name === selectedMock)?.items ?? [],
    [mocks, selectedMock]
  );

  return (
    <>
      {filteredMocks.map(mock => (
        <EditorItem key={mock.id} item={mock}></EditorItem>
      ))}
    </>
  );
}

export default EditorArea;
