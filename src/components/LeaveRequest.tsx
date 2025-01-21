import { leaveEntitlementExample } from "@/services/myobService";

export const LeaveRequest = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">MYOB Data Structure Reference</h2>
      <p className="mb-4 text-gray-600">This is a reference for the data structure needed in Power Automate when fetching MYOB leave balances:</p>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(leaveEntitlementExample, null, 2)}
      </pre>
    </div>
  );
};