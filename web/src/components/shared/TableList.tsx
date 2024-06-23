type TableProps = {
  headers: string[];
  data: Array<{ [key: string]: any }>;
};

const TableList: React.FC<TableProps> = ({ headers, data: filteredData }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                className={`py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  index === 0 ? "text-left md:text-center px-3" : "text-center"
                } ${
                  index === headers.length - 1
                    ? "text-center px-2 pr-2"
                    : "pr-2"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, index) => (
                <td
                  key={`${rowIndex}-${header}`}
                  className={`py-4 whitespace-nowrap text-sm text-gray-900 ${
                    index === 0
                      ? "text-left md:text-center px-3"
                      : "text-center"
                  } ${
                    index === headers.length - 1
                      ? "text-center grid grid-cols-1 md:block"
                      : "pr-2"
                  }`}
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
