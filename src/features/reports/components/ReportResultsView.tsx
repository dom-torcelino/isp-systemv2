import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { ArrowLeft, Download, FileText, FileSpreadsheet, File } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReportResultsViewProps {
  reportName: string;
  onBack: () => void;
}

// Mock data for SLA Compliance Report
const slaChartData = [
  { name: "SLA Met", value: 127, color: "#22c55e" },
  { name: "SLA Breached", value: 23, color: "#ef4444" },
];

const slaTableData = [
  {
    technician: "Mike Johnson",
    totalTickets: 42,
    breached: 3,
    breachPercent: "7.1%",
    avgResolution: "4.2 hrs",
  },
  {
    technician: "Sarah Williams",
    totalTickets: 38,
    breached: 5,
    breachPercent: "13.2%",
    avgResolution: "5.8 hrs",
  },
  {
    technician: "David Brown",
    totalTickets: 35,
    breached: 2,
    breachPercent: "5.7%",
    avgResolution: "3.9 hrs",
  },
  {
    technician: "Emily Davis",
    totalTickets: 35,
    breached: 8,
    breachPercent: "22.9%",
    avgResolution: "7.1 hrs",
  },
];

// Mock data for Ticket Volume Report
const ticketVolumeChartData = [
  { category: "Installation", count: 45 },
  { category: "Repair", count: 67 },
  { category: "Billing", count: 23 },
  { category: "Transfer", count: 31 },
  { category: "Upgrade", count: 19 },
];

export function ReportResultsView({ reportName, onBack }: ReportResultsViewProps) {
  const isSLAReport = reportName.includes("SLA");

  const slaColumns = [
    { label: "Technician", key: "technician" },
    { label: "Total Tickets", key: "totalTickets" },
    {
      label: "Tickets Breached",
      key: "breached",
      render: (value: number) => (
        <span className={value > 5 ? "text-destructive" : ""}>{value}</span>
      ),
    },
    {
      label: "Breach %",
      key: "breachPercent",
      render: (value: string) => {
        const percent = parseFloat(value);
        return (
          <Badge variant={percent > 10 ? "destructive" : "default"}>
            {value}
          </Badge>
        );
      },
    },
    { label: "Avg Resolution Time", key: "avgResolution" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2>Report: {reportName}</h2>
            <p className="text-muted-foreground text-sm">
              Filters Applied: Last 30 Days
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            Edit Filters
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <File className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Total Tickets</p>
              <h3 className="text-3xl">150</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">SLA Met</p>
              <h3 className="text-success text-3xl">127</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">SLA Breached</p>
              <h3 className="text-destructive text-3xl">23</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Success Rate</p>
              <h3 className="text-3xl">84.7%</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualization */}
      <div className="grid gap-6 lg:grid-cols-2">
        {isSLAReport ? (
          <Card>
            <CardHeader>
              <CardTitle>SLA Breached vs. Met</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={slaChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {slaChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Ticket Volume by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ticketVolumeChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Performance by Technician</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={slaTableData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="technician" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="totalTickets" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="breached" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results Table */}
      <DataTable
        title="Detailed Results"
        columns={slaColumns}
        data={slaTableData}
      />
    </div>
  );
}
