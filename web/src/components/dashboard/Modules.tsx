import { useEffect, useState } from "react";
import TableList from "../shared/TableList";
import InfoModal from "../shared/InfoModal";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ColoredButton from "../common/ColoredButton";
import { getUserModules } from "../../services/api";
import { ModuleType } from "../../types";
type TableRow = {
  Id: JSX.Element;
  Label: JSX.Element;
  Action: JSX.Element;
};

function OpenModuleButton({ id, data }: { id: number; data: ModuleType }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  function openInfo() {
    console.log(id);
    setOpen(true);
  }
  function editItem() {
    console.log(id, edit);
    setEdit(true);
  }

  const modalProperties = {
    icon: (
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
        <InformationCircleIcon
          className="h-6 w-6 text-blue-600"
          aria-hidden="true"
        />
      </div>
    ),
    title: "Module Information",
    buttons: (
      <>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Okay
          </button>

          {/* <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
            data-autofocus
          >
            Cancel
          </button> */}
        </div>
      </>
    ),
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 justify-center">
      <ColoredButton onClick={openInfo} blue small>
        Info
      </ColoredButton>
      <InfoModal
        modalProperties={modalProperties}
        open={open}
        setOpen={setOpen}
      >
        <div className="flex flex-col w-full">
          <span className="font-bold w-full block">{data.moduleName}</span>
          <span className="border-2 p-1 border-gray-200 rounded-lg bg-gray-100">
            {"#" + data.deviceId}
          </span>
          <span className="pt-4 mb-2">{data.description}</span>
          <code className="whitespace-break-spaces text-left border-2 p-2 rounded-md">
            {JSON.stringify(data.values, null, 2)}
          </code>
          <div className="flex flex-col items-start">
            <span>
              <span className="font-bold">Creation Date:</span> {data.createdAt}
            </span>
            <span>
              <span className="font-bold">Updated On:</span> {data.updatedAt}
            </span>
          </div>
        </div>
      </InfoModal>
      <ColoredButton onClick={editItem} pink small>
        Edit
      </ColoredButton>
      <ColoredButton to={`/app/module/${id}`} anchor small>
        Open
      </ColoredButton>
    </div>
  );
}

export default function Modules() {
  const headers: (keyof TableRow)[] = ["Id", "Label", "Action"];
  const [data, setData] = useState<TableRow[]>([
    {
      Id: <div className="animate-pulse bg-gray-200 flex h-8 rounded-full" />,
      Label: (
        <div className="animate-pulse bg-gray-200 flex h-8 rounded-full" />
      ),
      Action: (
        <div className="animate-pulse bg-gray-200 flex h-8 rounded-full" />
      ),
    },
  ]);
  const [error, setError] = useState("");
  const [loadedData, setLoadedData] = useState(false);

  async function run() {
    const response = await getUserModules();

    if (!response.success) {
      setError("An error occurred");
      return;
    }
    const { modules: m_1 } = response;
    const m_2 = m_1.map((m: ModuleType, idx: number): TableRow => {
      return {
        Id: <span>{idx + 1}</span>,
        Label: (
          <div className="flex flex-col">
            <span className="font-bold">{m.moduleName}</span>
            <span className="whitespace-break-spaces">{m.description}</span>
          </div>
        ),
        Action: <OpenModuleButton id={idx + 1} data={m} />,
      };
    });
    setData(m_2);
    setLoadedData(true);
  }

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<TableRow[]>(data);

  useEffect(() => {
    run();
  }, []);
  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        headers.some((header) =>
          String(row[header]).toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }, [data, filter]);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="flex flex-row justify-between py-2 items-center">
        <p className="text-text-muted">Total: {loadedData ? data.length : 0}</p>
        <input
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>
      <TableList headers={headers} data={filteredData} />
    </div>
  );
}
