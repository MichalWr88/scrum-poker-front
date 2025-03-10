export interface Task {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}

export interface Fields {
  customfield_12801: Customfield12801;
  labels: string[];
  components: Component[];
  subtasks: Subtask[];
  issuetype: Issuetype;
  sprint: Sprint;
  customfield_10021: number;
  customfield_10016: string;
  customfield_11902: Customfield11902;
  updated: string;
  description: string;
  summary: string;
  customfield_15486: number;
  epic: Epic;
  status: Status2;
  created: string;
  customfield_16400: number;
  flagged: boolean;
}

export interface Customfield12801 {
  self: string;
  value: string;
  id: string;
  disabled: boolean;
}

export interface Component {
  self: string;
  id: string;
  name: string;
}

export interface Subtask {
  id: string;
  key: string;
  self: string;
  fields: Fields2;
}

export interface Fields2 {
  summary: string;
  status: Status;
  priority: Priority;
  issuetype: Issuetype;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

export interface Priority {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}

export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId?: number;
}

export interface Sprint {
  id: number;
  self: string;
  state: string;
  name: string;
  startDate: string;
  endDate: string;
  activatedDate: string;
  originBoardId: number;
  goal: string;
  synced: boolean;
  autoStartStop: boolean;
}

export interface Customfield11902 {
  self: string;
  value: string;
  id: string;
  disabled: boolean;
}

export interface Epic {
  id: number;
  key: string;
  self: string;
  name: string;
  summary: string;
  fixVersions: unknown[];
  color: Color;
  done: boolean;
}

export interface Color {
  key: string;
}

export interface Status2 {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory2;
}

export interface StatusCategory2 {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}
