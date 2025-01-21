const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          {/* Main Info Panel */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">MYOB Leave Data Sync Service</h2>
            <p className="text-gray-600 mb-4">
              This service automatically syncs leave data from MYOB to SharePoint every morning at 6 AM.
              The data is stored both locally and in SharePoint for record-keeping purposes.
            </p>
          </div>

          {/* Service Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Data Source</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Connects to MYOB AccountRight API</li>
                <li>Fetches employee leave balances</li>
                <li>Processes data for all configured employees</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Data Storage</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Creates daily CSV files</li>
                <li>Stores locally in leave-balances directory</li>
                <li>Uploads to SharePoint document library</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Schedule</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Runs automatically at 6 AM daily</li>
                <li>Uses node-cron for scheduling</li>
                <li>Logs all sync activities</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">File Format</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>CSV format with headers</li>
                <li>Includes date, employee ID, leave type</li>
                <li>Records balance and units</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;