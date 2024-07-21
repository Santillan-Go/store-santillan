export function ProductsSqueleton() {
  return (
    <section className="mt-14 ">
      <h1 className="font-bold p-1 text-4xl h-10 w-28 bg-gray-400  rounded-2xl mb-3  animate-pulse "></h1>
      <article className="h-5/6  bg-slate-300 gap-4 rounded-2xl p-5  flex text-center">
        <section className="rounded-xl p-2 bg-white w-52 h-72 animate-pulse"></section>

        <section className="rounded-xl p-2 bg-white w-52 animate-pulse"></section>

        <section className="rounded-xl p-2 bg-white w-52 animate-pulse"></section>

        <section className="rounded-xl p-2 bg-white w-52 animate-pulse"></section>
      </article>
    </section>
  );
}
