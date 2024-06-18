import { useParams } from "react-router-dom";

const primaryService = {
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
          lat: 36,
          lng: 27,
          label: "point 1",
        },
        {
          lat: 26,
          lng: 36,
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

export default function ServiceItem() {
  const { serviceId } = useParams();
  console.log(serviceId);
  return (
    <div>
      <p className="font-semibold text-gray-500">Service Id: {serviceId}</p>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 lg:mx-0 lg:max-w-none md:max-w-none md:mx-0 md:grid-cols-2 lg:grid-cols-3 pt-2">
        <SquareCard
          key={primaryService.linegraph.id}
          card={primaryService.linegraph}
        >
          <div className="bg-gray-100 w-full aspect-video rounded-md"></div>
        </SquareCard>
        <SquareCard key={primaryService.gauge.id} card={primaryService.gauge}>
          <div className="flex justify-center">
            <div className="bg-gray-100 w-3/5 aspect-square rounded-md"></div>
          </div>
        </SquareCard>
        <SquareCard
          key={primaryService.mapview.id}
          card={primaryService.mapview}
        >
          <div className="bg-gray-100 w-full aspect-video rounded-md"></div>
        </SquareCard>
        <SquareCard
          key={primaryService.livefeed.id}
          card={primaryService.livefeed}
          isWide
        >
          <div className="bg-gray-100 w-full aspect-video rounded-md" />
        </SquareCard>
      </div>
    </div>
  );
}

function SquareCard({ children, card, isWide }: any) {
  const { id, type, title } = card;
  return (
    <article
      key={id}
      className={`flex max-w-xl flex-col items-start justify-around py-2 px-4 pb-4 shadow-lg hover:shadow-xl rounded-lg border border-1 border-gray-200 ${
        isWide ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex flex-col text-xs">
        <div className="flex items-center gap-x-4">
          <span className="text-gray-500">{title}</span>
          <span className="relative z-10 rounded-full px-3 bg-gray-50  font-medium text-gray-600 py-1.5 hover:bg-gray-100">
            {type}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <span className="w-full">
            <span className="absolute inset-0 w-full" />
            {title}
          </span>
        </h3>
      </div>
      <div className="group relative w-full">
        <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 w-full">
          {children}
        </div>
      </div>
    </article>
  );
}
