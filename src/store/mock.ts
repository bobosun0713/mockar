import { create } from "zustand";

import type { MockData, MockProjectItem, MockResponse, MockResponseItem } from "@/types/mock";

interface MockState extends MockData {
  setProject: (projectName: string) => void;
  setProjectItem: (mockName: string, val: MockResponseItem) => void;
  setItemResponse: (mockName: string, url: string, val: MockResponse) => void;
}

const addProject = (mocks: MockProjectItem[], projectName: string) => {
  mocks.push({ name: projectName, items: [] });
  return mocks;
};

const addProjectItem = (mocks: MockProjectItem[], mockName: string, val: MockResponseItem) => {
  return mocks.map(mock => {
    if (mock.name === mockName) mock.items.push(val);
    return mock;
  });
};

const addItemResponse = (mocks: MockProjectItem[], mockName: string, url: string, val: MockResponse) => {
  return mocks.map(mock => {
    if (mock.name === mockName) {
      const curItem = mock.items.find(i => i.url === url);
      if (curItem) {
        curItem.responseList = [...curItem.responseList, val];
      }
    }
    return mock;
  });
};

export const useMockStore = create<MockState>(set => ({
  mocks: [],

  setProject(projectName: string) {
    set(state => ({
      ...state,
      projects: addProject(state.mocks, projectName)
    }));
  },

  setProjectItem(name: string, val: MockResponseItem) {
    set(state => ({
      ...state,
      projects: addProjectItem(state.mocks, name, val)
    }));
  },

  setItemResponse(name: string, url: string, val: MockResponse) {
    set(state => ({
      ...state,
      projects: addItemResponse(state.mocks, name, url, val)
    }));
  }
}));

export default useMockStore;
