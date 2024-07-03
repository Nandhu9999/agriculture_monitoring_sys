export type ModuleType = {
  moduleId: number;
  deviceId: string;
  moduleName: string;
  description: string;
  lat: number;
  lng: number;
  values: any;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type ModuleGroupType = {
  moduleGroupId: number;
  userId: number;
  groupName: string;
  modulesArray: ModuleType[];
  description: string;
};
