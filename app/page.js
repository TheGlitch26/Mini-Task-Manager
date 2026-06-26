import Image from "next/image";
import TaskList from "@/app/components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold">TaskFlow</h1>
            <p className="text-sm text-gray-500">
              Simple task management for your team
            </p>
          </div>

          <button className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:opacity-90 transition">
            Login
          </button>
        </header>

        {/* Main content area */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Tasks</h2>

            <button className="px-3 py-1.5 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800 transition">
              + New Task
            </button>
          </div>

          {/* Placeholder empty state */}
          <TaskList />
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-gray-400">
          Built for a small team • Next.js + Supabase
        </footer>

      </div>
    </main>
  );
}
