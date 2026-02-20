import { create } from "zustand";

import type { MockData, MockProjectItem, MockResponseItem } from "@/types/mock";

type SortDirection = "UP" | "DOWN";

interface MockState extends MockData {
  selectedMock: string;
  setMock: (mockName: string) => void;
  setResponseItem: () => void;
  setSelectedMock: (mockProjectName: string) => void;
  updateResponse: (val: Partial<MockResponseItem>) => void;
  updateMockOrder: (mockName: string, type: SortDirection) => void;
  updateResponseOrder: (id: string, type: SortDirection) => void;
  deleteMock: (mockName: string) => void;
  deleteResponse: (id: string) => void;
  deleteAllResponse: () => void;
  importMock: (data: MockProjectItem[]) => void;
}

const mockResponseData = () => {
  return {
    id: crypto.randomUUID(),
    url: "/mock",
    method: "GET",
    status: "200",
    delay: "50",
    enabled: true,
    requestCount: 0,
    requestPayload: "{}",
    responseList: [{ name: "New Response 1", method: "GET", status: "200", delay: "10", response: `{ "data": {} }` }],
    responseName: "New Response 1",
    activeResponseName: "New Response 1"
  } as MockResponseItem;
};

const addMock = (mocks: MockProjectItem[], mockName: string) => {
  mocks.unshift({
    name: mockName,
    items: [mockResponseData()]
  });
  return mocks;
};

const addResponseItem = (mocks: MockProjectItem[], mockName: string) => {
  return mocks.map(mock => {
    if (mock.name === mockName) mock.items.unshift(mockResponseData());
    return mock;
  });
};

const updateResponse = (mocks: MockProjectItem[], mockName: string, val: Partial<MockResponseItem>) => {
  return mocks.map(mock => {
    if (mock.name === mockName) {
      const curItem = mock.items.find(item => item.id === val.id);
      console.log("val ->", val);
      if (curItem) Object.assign(curItem, val);
    }
    return mock;
  });
};

const updateMockOrder = (mocks: MockProjectItem[], mockName: string, type: "UP" | "DOWN") => {
  const findIdx = mocks.findIndex(mock => mock.name === mockName);

  if (type === "UP" && findIdx !== 0) [mocks[findIdx - 1], mocks[findIdx]] = [mocks[findIdx], mocks[findIdx - 1]];

  if (type === "DOWN" && findIdx < mocks.length - 1)
    [mocks[findIdx], mocks[findIdx + 1]] = [mocks[findIdx + 1], mocks[findIdx]];

  return mocks;
};

const updateResponseOrder = (mocks: MockProjectItem[], mockName: string, id: string, type: "UP" | "DOWN") => {
  return mocks.map(mock => {
    if (mock.name === mockName) {
      const findIdx = mock.items.findIndex(item => item.id === id);
      if (type === "UP" && findIdx !== 0)
        [mock.items[findIdx - 1], mock.items[findIdx]] = [mock.items[findIdx], mock.items[findIdx - 1]];

      if (type === "DOWN" && findIdx < mock.items.length - 1) {
        [mock.items[findIdx], mock.items[findIdx + 1]] = [mock.items[findIdx + 1], mock.items[findIdx]];
      }
    }
    return mock;
  });
};

const deleteMock = (mocks: MockProjectItem[], mockName: string) => {
  return mocks.filter(mock => mock.name !== mockName);
};

const deleteResponse = (mocks: MockProjectItem[], mockName: string, id: string) => {
  return mocks.map(mock => {
    if (mock.name === mockName) return { ...mock, items: mock.items.filter(item => item.id !== id) };
    return mock;
  });
};

const deleteAllResponse = (mocks: MockProjectItem[], mockName: string) => {
  return mocks.map(mock => {
    if (mock.name === mockName) return { ...mock, items: [] };
    return mock;
  });
};

const importMock = (mocks: MockProjectItem[], selectedMock: string, data: MockProjectItem[]) => {
  mocks = [...data];
  selectedMock = mocks[0].name;
  return { mocks, selectedMock };
};

export const useMockStore = create<MockState>(set => ({
  mocks: [],
  selectedMock: "",

  setMock(name: string) {
    set(state => ({
      ...state,
      mocks: addMock(state.mocks, name),
      selectedMock: name
    }));
  },

  setSelectedMock(name: string) {
    set(state => ({
      ...state,
      selectedMock: name
    }));
  },

  setResponseItem() {
    set(state => ({
      ...state,
      mocks: addResponseItem(state.mocks, state.selectedMock)
    }));
  },

  updateResponse(val: Partial<MockResponseItem>) {
    set(state => ({
      ...state,
      mocks: updateResponse(state.mocks, state.selectedMock, val)
    }));
  },

  updateMockOrder(name: string, type: SortDirection) {
    set(state => ({
      ...state,
      mocks: updateMockOrder(state.mocks, name, type)
    }));
  },

  updateResponseOrder(id: string, type: SortDirection) {
    set(state => ({
      ...state,
      mocks: updateResponseOrder(state.mocks, state.selectedMock, id, type)
    }));
  },

  deleteMock(name: string) {
    set(state => ({
      ...state,
      mocks: deleteMock(state.mocks, name)
    }));
  },

  deleteResponse(id: string) {
    set(state => ({
      ...state,
      mocks: deleteResponse(state.mocks, state.selectedMock, id)
    }));
  },

  deleteAllResponse() {
    set(state => ({
      ...state,
      mocks: deleteAllResponse(state.mocks, state.selectedMock)
    }));
  },

  importMock(data: MockProjectItem[]) {
    if (!data.every(val => Array.isArray(val.items) && val.name)) return;
    set(state => {
      const { mocks, selectedMock } = importMock(state.mocks, state.selectedMock, data);
      return {
        ...state,
        mocks,
        selectedMock
      };
    });
  }
}));

export default useMockStore;
