import Navigation from "@/components/Navigation";
import UserDashboard from "@/components/UserDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <UserDashboard />
      </div>
    </div>
  );
};

export default Dashboard;