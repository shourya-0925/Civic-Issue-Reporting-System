import Navigation from "@/components/Navigation";
import LeaderboardComponent from "@/components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank among your fellow citizens working to improve our community
          </p>
        </div>
        <LeaderboardComponent />
      </div>
    </div>
  );
};

export default LeaderboardPage;