import Navigation from "@/components/Navigation";
import IssueReportForm from "@/components/IssueReportForm";

const Report = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      <div className="py-8">
        <IssueReportForm />
      </div>
    </div>
  );
};

export default Report;