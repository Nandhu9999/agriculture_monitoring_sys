import { useEffect, useState } from "react";
import TableList from "../shared/TableList";
import InfoModal from "../shared/InfoModal";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ColoredButton from "../common/ColoredButton";
type TableRow = {
  Id: number;
  Name: string;
  Action: JSX.Element;
};

function OpenModuleButton({ id }: { id: number }) {
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
    title: "Service Information",
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

          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpen(false)}
            data-autofocus
          >
            Cancel
          </button>
        </div>
      </>
    ),
  };

  return (
    <>
      <ColoredButton onClick={openInfo} blue small>
        Info
      </ColoredButton>
      <InfoModal
        modalProperties={modalProperties}
        open={open}
        setOpen={setOpen}
      >
        Information about the Module... lorem lorem lorem lorem lorem lorem
        lorem
      </InfoModal>
      <ColoredButton onClick={editItem} pink small>
        Edit
      </ColoredButton>
      <ColoredButton to={`/app/module/${id}`} anchor small>
        Open
      </ColoredButton>
    </>
  );
}

export default function Modules() {
  const headers: (keyof TableRow)[] = ["Id", "Name", "Action"];
  const data: TableRow[] = [
    {
      Id: 1,
      Name: "Module#1",
      Action: <OpenModuleButton id={1} />,
    },
    {
      Id: 2,
      Name: "Module#2",
      Action: <OpenModuleButton id={2} />,
    },
    {
      Id: 3,
      Name: "Module#3",
      Action: <OpenModuleButton id={3} />,
    },
    {
      Id: 4,
      Name: "Module#4",
      Action: <OpenModuleButton id={4} />,
    },
    {
      Id: 5,
      Name: "Module#5",
      Action: <OpenModuleButton id={5} />,
    },
    {
      Id: 6,
      Name: "Module#6",
      Action: <OpenModuleButton id={6} />,
    },
    {
      Id: 7,
      Name: "Module#7",
      Action: <OpenModuleButton id={7} />,
    },
    {
      Id: 8,
      Name: "Module#8",
      Action: <OpenModuleButton id={8} />,
    },
    {
      Id: 9,
      Name: "Module#9",
      Action: <OpenModuleButton id={9} />,
    },
    {
      Id: 10,
      Name: "Module#10",
      Action: <OpenModuleButton id={10} />,
    },
  ];

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<TableRow[]>(data);

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        headers.some((header) =>
          String(row[header]).toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }, [filter]);

  return (
    <div>
      <div className="flex flex-row justify-between py-2 items-center">
        <p className="text-text-muted">Total: {data.length}</p>
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
