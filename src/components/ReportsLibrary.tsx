import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  DollarSign,
  AlertCircle,
  Ticket,
  Clock,
  Wrench,
  ThumbsUp,
  TrendingDown,
  Users,
} from "lucide-react";
import { GenerateReportModal } from "./GenerateReportModal";
import { ReportResultsView } from "./ReportResultsView";

interface ReportCard {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
}

const reportTemplates: ReportCard[] = [
  {
    id: "revenue-summary",
    title: "Revenue Summary",
    description: "View total revenue, collections, and payment trends",
    category: "Billing Reports",
    icon: DollarSign,
  },
  {
    id: "overdue-accounts",
    title: "Overdue Accounts Report",
    description: "Detailed list of overdue and suspended accounts",
    category: "Billing Reports",
    icon: AlertCircle,
  },
  {
    id: "ticket-volume",
    title: "Ticket Volume Report",
    description: "Analyze ticket creation and resolution trends",
    category: "Operations Reports",
    icon: Ticket,
  },
  {
    id: "sla-compliance",
    title: "SLA Compliance Report",
    description: "Track service level agreement performance",
    category: "Operations Reports",
    icon: Clock,
  },
  {
    id: "technician-performance",
    title: "Technician Performance",
    description: "Evaluate individual technician productivity and SLA",
    category: "Technician Reports",
    icon: Wrench,
  },
  {
    id: "customer-feedback",
    title: "Customer Feedback (CSAT)",
    description: "Review customer satisfaction scores and feedback",
    category: "Technician Reports",
    icon: ThumbsUp,
  },
  {
    id: "customer-churn",
    title: "Customer Churn Report",
    description: "Identify customers at risk and churn trends",
    category: "Customer Reports",
    icon: TrendingDown,
  },
  {
    id: "most-tickets",
    title: "Most Tickets by Customer",
    description: "Find customers with the highest ticket volume",
    category: "Customer Reports",
    icon: Users,
  },
];

export function ReportsLibrary() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportCard | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleGenerateReport = (report: ReportCard) => {
    setSelectedReport(report);
    setShowGenerateModal(true);
  };

  const handleRunReport = () => {
    setShowGenerateModal(false);
    setShowResults(true);
  };

  const handleBackToLibrary = () => {
    setShowResults(false);
    setSelectedReport(null);
  };

  if (showResults && selectedReport) {
    return (
      <ReportResultsView
        reportName={selectedReport.title}
        onBack={handleBackToLibrary}
      />
    );
  }

  const categories = Array.from(new Set(reportTemplates.map((r) => r.category)));

  return (
    <div className="space-y-6">
      <div>
        <h2>Report Center</h2>
        <p className="text-muted-foreground">
          Generate detailed reports and analytics for your ISP operations
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h3>{category}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reportTemplates
              .filter((report) => report.category === category)
              .map((report) => {
                const Icon = report.icon;
                return (
                  <Card key={report.id} className="relative">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-base">{report.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {report.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        onClick={() => handleGenerateReport(report)}
                      >
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      {selectedReport && (
        <GenerateReportModal
          open={showGenerateModal}
          onOpenChange={setShowGenerateModal}
          reportName={selectedReport.title}
          onRunReport={handleRunReport}
        />
      )}
    </div>
  );
}
