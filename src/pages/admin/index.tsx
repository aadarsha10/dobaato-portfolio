import AdminPage from "./AdminPage";

export default function Admin() {
  return (
    <>
      <main className=" min-h-screen bg-[#F5F6FA] dark:bg-[#10172A]">
        <div className="w-full px-4 py-4 text-gray-800 dark:text-white md:px-6">
          <AdminPage />
        </div>
      </main>
    </>
  );
}
