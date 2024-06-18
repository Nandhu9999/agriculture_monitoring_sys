const appConfig = {
  FB_APIKEY: import.meta.env.VITE_FB_APIKEY,
  FB_AUTHDOMAIN: import.meta.env.VITE_FB_AUTHDOMAIN,
  FB_PROJECTID: import.meta.env.VITE_FB_PROJECTID,
  FB_STORAGEBUCKET: import.meta.env.VITE_FB_STORAGEBUCKET,
  FB_MSGSENDERID: import.meta.env.VITE_FB_MSGSENDERID,
  FB_APPID: import.meta.env.VITE_FB_APPID,
  SERVER_API: "",
};

export const primaryService = {
  linegraph: {
    id: "s1",
    type: "linegraph",
    title: "Humidity and Temperature",
    details: {
      headers: ["humidity", "temperature"],
      data: [
        {
          humidity: 100,
          temperature: 23,
        },
        {
          humidity: 89,
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
  mapview: {
    id: "s3",
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
    id: "s4",
    type: "view",
    title: "Live Feed",
    details: {
      headers: ["live"],
      data: {},
    },
  },
};

export default appConfig;
