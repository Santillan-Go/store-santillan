"use client";
import { Search } from "@mui/icons-material";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function FormSearch() {
  // const handleChange = (query: string | undefined) => {};

  const params = useSearchParams();
  const pathame = usePathname();
  // const query = localStorage.getItem("query") || "";
  const isInSearch =
    pathame.includes("/search") || pathame.includes("/product");
  //const pathname = usePathname();
  const { push } = useRouter();
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem(
      "query"
    ) as HTMLInputElement;
    if (!input) return;

    if (!input.value) return;
    const serachParams = new URLSearchParams(params);
    localStorage.setItem("query", input.value);
    serachParams.set("query", input.value);
    // replace(`${pathname}/?${serachParams.toString()}`);
    push(`/search/?${serachParams.toString()}`);
  };

  const getValue = () => {
    if (!isInSearch) {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("query");
        console.log(" WERE IN ");
        return "";
      }
      return "";
    } else {
      return params.get("query") || "";
    }
  };

  return (
    <form className="w-full flex items-center gap-2" onSubmit={handleSearch}>
      <div className="relative flex-1">
        <input
          type="search"
          name="query"
          autoComplete="off"
          className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800"
          defaultValue={getValue()}
          placeholder="Search products..."
        />
      </div>
      <button
        type="submit"
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}

export default FormSearch;
