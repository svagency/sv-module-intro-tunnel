import { AppNavigation } from "@/components/app-navigation"

export default function AppPage() {
  return (
    <>
      <AppNavigation />
      <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-300 mb-6">Main Application Area</h2>
        <p className="text-lg text-gray-300 mb-4">Welcome to the main application! The intro sequence is complete.</p>
        <p className="text-gray-400">
          This is where your primary application content, dashboards, features, etc., will be displayed. The header and
          footer are part of the AppLayout.
        </p>
        {/* Example content */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Feature Card 1</h3>
            <p className="text-gray-300">Details about feature one...</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Feature Card 2</h3>
            <p className="text-gray-300">Details about feature two...</p>
          </div>
        </div>
      </div>
    </>
  )
}
