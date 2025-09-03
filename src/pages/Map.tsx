import Navigation from "@/components/Navigation";
import IssueMap from "@/components/IssueMap";

const Map = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <IssueMap />
      </div>
    </div>
  );
};

export default Map;