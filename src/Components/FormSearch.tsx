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
    <form className="w-80  flex justify-evenly" onSubmit={handleSearch}>
      <input
        type="search"
        name="query"
        autoComplete="off"
        className="w-60 p-1 rounded-lg text-black pl-1"
        defaultValue={getValue()}
      />
      <button
        type="submit"
        className="w-14 font-bold  border rounded-lg bg-transparent hover:cursor-pointer hover:bg-gray-200 hover:text-black"
      >
        <Search />
      </button>
    </form>
  );
}

export default FormSearch;
