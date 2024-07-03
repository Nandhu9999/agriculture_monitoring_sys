import { useParams } from "react-router-dom";
import { primaryService } from "../../appConfig";
import MapComponent from "../shared/MapComponent";
import { Suspense } from "react";
import CommonLineChart from "../shared/CommonLineChart";
// import MultiLevelPieChart from "../shared/MultiLevelPieChart";
import SimpleRadialBarChart from "../shared/SimpleRadialBarChart";

export default function GroupsItem() {
  const { groupId } = useParams();
  console.log(groupId);
  return (
    <div>
      <p className="font-semibold text-gray-500">Group Id: {groupId}</p>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 lg:mx-0 lg:max-w-none md:max-w-none md:mx-0 md:grid-cols-2 lg:grid-cols-3 pt-2">
        <SquareCard
          key={primaryService.humidity.id}
          card={primaryService.humidity}
        >
          {false ? (
            <div className="bg-gray-200 w-full aspect-video rounded-md"></div>
          ) : (
            <CommonLineChart
              label={"Humidity"}
              unit={"g.m3"}
              color={"red"}
              rawData={[0, 1, 4, 3, 4, 2]}
            />
          )}
        </SquareCard>

        <SquareCard
          key={primaryService.temperature.id}
          card={primaryService.temperature}
        >
          {false ? (
            <div className="bg-gray-200 w-full aspect-video rounded-md"></div>
          ) : (
            <CommonLineChart
              label={"Temperature"}
              unit={"°C"}
              color={"orange"}
              rawData={[0, 1, 3, 3, 4, 2]}
            />
          )}
        </SquareCard>

        <SquareCard key={primaryService.gauge.id} card={primaryService.gauge}>
          <div className="flex justify-center">
            {false ? (
              <div className="bg-gray-200 w-full aspect-video rounded-md animate-pulse"></div>
            ) : (
              // <MultiLevelPieChart
              //   labels={["a", "b", "c"]}
              //   unit={"%"}
              //   colors={["purple", "pink", "magenta"]}
              // />
              <SimpleRadialBarChart />
            )}
          </div>
        </SquareCard>
        <SquareCard
          key={primaryService.soilmoisture.id}
          card={primaryService.soilmoisture}
        >
          <div className="flex justify-center">
            <div className="bg-gray-200 w-full aspect-video rounded-md animate-pulse"></div>
          </div>
        </SquareCard>
        {/* <SquareCard
          key={primaryService.phsensor.id}
          card={primaryService.phsensor}
        >
          <div className="flex justify-center">
            <div className="bg-gray-200 w-full aspect-video rounded-md animate-pulse"></div>
          </div>
        </SquareCard> */}
        <SquareCard
          key={primaryService.livefeed.id}
          card={primaryService.livefeed}
        >
          <div
            className="bg-gray-200 w-full aspect-video rounded-md"
            style={{
              backgroundImage:
                "url('https://st4.depositphotos.com/1026531/30839/i/450/depositphotos_308395272-stock-photo-tv-screen-no-signal-static.jpg')",
            }}
          />
        </SquareCard>
        <SquareCard
          key={primaryService.mapview.id}
          card={primaryService.mapview}
        >
          <Suspense
            fallback={
              <div className="bg-gray-200 w-full aspect-video rounded-md animate-pulse" />
            }
          >
            <MapComponent customMarkers={primaryService.mapview.details.data} />
          </Suspense>
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
            <span className="w-full" />
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
