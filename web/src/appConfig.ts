const modulesArray = [
  {
    moduleId: 1,
    deviceId: "11223344",
    moduleName: "ESP32 Module",
    description: "tracking the humidity & temp near potato farm",
    lat: 10.8994,
    lng: 76.903,
    values: {
      deviceType: "esp",
      battery: 100,
      latest: { temperature: 2800, humidity: 4000 },
    },
    code: "> import code.c",
    createdAt: "2024-06-23T10:58:49.000Z",
    updatedAt: "2024-06-23T10:58:49.000Z",
  },
  {
    moduleId: 2,
    deviceId: "aabbccdd",
    moduleName: "RPI Module",
    description: "tracking and scanning for diseases & intruders",
    lat: 10.8994,
    lng: 76.903,
    values: {
      deviceType: "rpi",
      battery: 42,
      latest: { path: "" },
    },
    code: "> import code.py",
    createdAt: "2024-06-23T10:58:49.000Z",
    updatedAt: "2024-06-23T10:58:49.000Z",
  },
];
export const DEV_MODE = {
  isActive: import.meta.env.VITE_DEV_MODE === "true",
  userModules: modulesArray,
  moduleGroups: [
    {
      moduleGroupId: 1,
      userId: 1,
      groupName: "central_g1",
      modulesArray: modulesArray,
      description: "all modules group desc",
    },
  ],
};

console.log("DEV_MODE", { isActive: DEV_MODE.isActive });

const appConfig = {
  FB_APIKEY: import.meta.env.VITE_FB_APIKEY,
  FB_AUTHDOMAIN: import.meta.env.VITE_FB_AUTHDOMAIN,
  FB_PROJECTID: import.meta.env.VITE_FB_PROJECTID,
  FB_STORAGEBUCKET: import.meta.env.VITE_FB_STORAGEBUCKET,
  FB_MSGSENDERID: import.meta.env.VITE_FB_MSGSENDERID,
  FB_APPID: import.meta.env.VITE_FB_APPID,
  API_LIST: [import.meta.env.VITE_AMS_SERVER_API, "http://localhost:9980"],
  get SERVER_API() {
    return DEV_MODE.isActive ? this.API_LIST[0] : this.API_LIST[1];
  },
};

export const primaryService = {
  humidity: {
    id: "s0",
    type: "linegraph",
    title: "Humidity",
    details: {
      headers: ["humidity"],
      data: [
        {
          humidity: 100,
        },
        {
          humidity: 89,
        },
      ],
    },
  },
  temperature: {
    id: "s1",
    type: "linegraph",
    title: "Temperature",
    details: {
      headers: ["temperature"],
      data: [
        {
          temperature: 23,
        },
        {
          temperature: 26,
        },
      ],
    },
  },
  gauge: {
    id: "s2",
    type: "gauge",
    title: "Battery",
    details: {
      headers: ["rpi", "camera", "sensors"],
      data: {
        rpi: 49,
        camera: 99,
        sensors: 78,
      },
    },
  },
  soilmoisture: {
    id: "s3",
    type: "linegraph",
    title: "Soil Moisture",
    details: {
      headers: ["Volumetric Water Content"],
      data: {},
    },
  },
  phsensor: {
    id: "s4",
    type: "linegraph",
    title: "pH Sensor",
    details: {
      headers: ["acidity"],
      data: {
        acidity: 5.2,
      },
    },
  },
  mapview: {
    id: "s5",
    type: "view",
    title: "Location",
    details: {
      headers: ["map"],
      data: [
        {
          location: [10.9035053, 76.8987548],
          label: "point 1",
        },
        {
          location: [10.903667, 76.9015989],
          label: "point 2",
        },
      ],
    },
  },
  livefeed: {
    id: "s6",
    type: "view",
    title: "Live Feed",
    details: {
      headers: ["live"],
      data: {},
    },
  },
};

export default appConfig;
