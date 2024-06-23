export type ModuleType = {
  moduleId: number;
  deviceId: string;
  moduleName: string;
  description: string;
  values: JSON;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type ModuleGroupType = {
  moduleGroupId: number;
  userId?: number;
  groupName: string;
  modulesArray: ModuleType[];
  description: string;
};
