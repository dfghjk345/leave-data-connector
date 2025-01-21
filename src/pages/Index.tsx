const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">MYOB Leave Data Sync Service</h2>
          <p className="text-gray-600">
            This service automatically syncs leave data from MYOB to SharePoint every morning at 6 AM.
            The data is stored both locally and in SharePoint for record-keeping purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;