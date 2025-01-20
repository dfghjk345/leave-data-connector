import { LeaveRequest } from "@/components/LeaveRequest";
import { MYOBConfig } from "@/components/MYOBConfig";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <Link 
          to="/myob-config" 
          className="inline-block mb-4 text-blue-600 hover:text-blue-800 underline"
        >
          Open Standalone MYOB Config
        </Link>
        <MYOBConfig />
        <LeaveRequest />
      </div>
    </div>
  );
};

export default Index;