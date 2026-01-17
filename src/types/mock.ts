import type { Method } from "./network";

export interface MockResponse {
  name: string;
  method: Method;
  status: string;
  response: string;
  delay: string;
}

export interface MockResponseItem extends Omit<MockResponse, "response" | "name"> {
  id: string;
  url: string;
  label: string;
  enabled: boolean;
  requestCount: number;
  requestPayload: string;
  responseList: MockResponse[];
  responseName: string;
  activeResponseName: string;
}

export interface MockProjectItem {
  name: string;
  items: MockResponseItem[];
}

export interface MockData {
  mocks: MockProjectItem[];
}
