import { LeaveRequest } from "@/components/LeaveRequest";
import { MYOBConfig } from "@/components/MYOBConfig";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <MYOBConfig />
        <LeaveRequest />
      </div>
    </div>
  );
};

export default Index;