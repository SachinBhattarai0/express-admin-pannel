import { TableInfo } from "../types/main";

const Header = ({ activeTable }: { activeTable: TableInfo | null }) => {
  return (
    <header className="bg-white shadow w-full h-20">
      <div className="mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-700">
          {activeTable?.tableName}
        </h1>
      </div>
    </header>
  );
};

export default Header;
