// import { useAuth } from "../../contexts/authContext";

import DashboardChart from "../shared/DashboardChart";

export default function Dashboard() {
  // const { currentUser, loggedInTime } = useAuth();
  // const timeInText = new Date(loggedInTime).toString().split("GMT")[0];
  return (
    <div>
      <div></div>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-3">
        <div className="w-full flex gap-2 md:flex-col">
          <DashboardCard title={"Total Modules"} padded>
            <h1 className="text-3xl font-extrabold">2</h1>
            <hr />
            <div>xxx</div>
          </DashboardCard>
          <DashboardCard title={"Total Groups"} padded>
            <h1 className="text-3xl font-extrabold">1</h1>
            <hr />
            <div>yyy</div>
          </DashboardCard>
          <DashboardCard title={"Total Issues"} padded>
            <h1 className="text-3xl font-extrabold">8</h1>
            <hr />
            <div>zzz</div>
          </DashboardCard>
        </div>
        <div className="h-96 md:h-auto w-full col-span-2">
          <DashboardCard title={"Schedule"} isWide>
            <div className="w-full h-4/5 pt-4">
              <DashboardChart />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ children, title, isWide, padded }: any) {
  return (
    <article
      className={`w-full h-full items-start justify-around py-2 ${
        padded ? "px-4" : "px-0"
      } pb-4 shadow-lg hover:shadow-xl rounded-lg border border-1 border-gray-200 ${
        isWide ? "col-span-2" : ""
      }`}
    >
      <div className="flex flex-col text-xs">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <span className="w-full">
            <span className={`w-full ${padded ? "" : "px-4"}`} />
            {title}
          </span>
        </h3>
      </div>
      <div className="group relative w-full h-full">
        <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 w-full h-full">
          {children}
        </div>
      </div>
    </article>
  );
}
