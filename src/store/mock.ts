import { create } from "zustand";

import type { MockData, MockProjectItem, MockResponse, MockResponseItem } from "@/types/mock";

type ItemOrderType = "UP" | "DOWN";

interface MockState extends MockData {
  selectedMockProject: string;
  setProject: (projectName: string) => void;
  setProjectItem: () => void;
  setItemResponse: (mockName: string, url: string, val: MockResponse) => void;
  setSelectedMockProject: (mockProjectName: string) => void;
  updateItem: (val: Partial<MockResponseItem>) => void;
  updateItemOrder: (id: string, type: ItemOrderType) => void;
  deleteItem: (id: string) => void;
}

const mockResponseData = () => {
  return {
    id: crypto.randomUUID(),
    url: "/mock",
    label: "",
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

const addProject = (mocks: MockProjectItem[], projectName: string) => {
  mocks.unshift({
    name: projectName,
    items: [mockResponseData()]
  });
  return mocks;
};

const addProjectItem = (mocks: MockProjectItem[], projectName: string) => {
  return mocks.map(mock => {
    if (mock.name === projectName) mock.items.unshift(mockResponseData());
    return mock;
  });
};

const addItemResponse = (mocks: MockProjectItem[], projectName: string, url: string, val: MockResponse) => {
  return mocks.map(mock => {
    if (mock.name === projectName) {
      const curItem = mock.items.find(i => i.url === url);
      if (curItem) curItem.responseList = [...curItem.responseList, val];
    }
    return mock;
  });
};

const updateItem = (mocks: MockProjectItem[], projectName: string, val: Partial<MockResponseItem>) => {
  return mocks.map(mock => {
    if (mock.name === projectName) {
      const curItem = mock.items.find(item => item.id === val.id);
      if (curItem) Object.assign(curItem, val);
    }
    return mock;
  });
};

const updateItemOrder = (mocks: MockProjectItem[], projectName: string, id: string, type: "UP" | "DOWN") => {
  return mocks.map(mock => {
    if (mock.name === projectName) {
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

const deleteItem = (mocks: MockProjectItem[], projectName: string, id: string) => {
  return mocks.map(mock => {
    if (mock.name === projectName) return { ...mock, items: mock.items.filter(item => item.id !== id) };
    return mock;
  });
};

export const useMockStore = create<MockState>(set => ({
  mocks: [],
  selectedMockProject: "",

  setSelectedMockProject(name: string) {
    set(state => ({
      ...state,
      selectedMockProject: name
    }));
  },

  setProject(projectName: string) {
    set(state => ({
      ...state,
      mocks: addProject(state.mocks, projectName),
      selectedMockProject: projectName
    }));
  },

  setProjectItem() {
    set(state => ({
      ...state,
      mocks: addProjectItem(state.mocks, state.selectedMockProject)
    }));
  },

  setItemResponse(name: string, url: string, val: MockResponse) {
    set(state => ({
      ...state,
      mocks: addItemResponse(state.mocks, name, url, val)
    }));
  },

  updateItem(val: Partial<MockResponseItem>) {
    set(state => ({
      ...state,
      mocks: updateItem(state.mocks, state.selectedMockProject, val)
    }));
  },

  updateItemOrder(id: string, type: ItemOrderType) {
    set(state => ({
      ...state,
      mocks: updateItemOrder(state.mocks, state.selectedMockProject, id, type)
    }));
  },

  deleteItem(id: string) {
    set(state => ({
      ...state,
      mocks: deleteItem(state.mocks, state.selectedMockProject, id)
    }));
  }
}));

export default useMockStore;
