import LogoutView from "@/Components/LogoutView";

function page() {
  return (
    <section className="w-full h-full flex flex-col  items-center">
      <p className="text-3xl font-semibold ">
        Are you sure you want to log out?
      </p>
      <LogoutView />
    </section>
  );
}

export default page;
