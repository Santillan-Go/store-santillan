import LogoutView from "@/Components/LogoutView";

function page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-3xl">
      <section className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 space-y-6 animate-fade-in ">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Sign Out</h1>
          <p className="text-gray-600">
            Are you sure you want to sign out of your account?
          </p>
        </div>

        <LogoutView />
      </section>
    </main>
  );
}

export default page;
