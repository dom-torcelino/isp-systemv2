import { DataTable } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Server, Wifi, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@/contexts/ThemeContext";

// Mock data for network latency over 24 hours
const latencyData = [
  { time: "00:00", latency: 15 },
  { time: "02:00", latency: 14 },
  { time: "04:00", latency: 16 },
  { time: "06:00", latency: 18 },
  { time: "08:00", latency: 22 },
  { time: "10:00", latency: 25 },
  { time: "12:00", latency: 28 },
  { time: "14:00", latency: 26 },
  { time: "16:00", latency: 24 },
  { time: "18:00", latency: 21 },
  { time: "20:00", latency: 19 },
  { time: "22:00", latency: 17 },
  { time: "24:00", latency: 15 },
];

const assignedTickets = [
  {
    id: "IT-TKT-1023",
    customer: "John Smith",
    issue: "Mikrotik API sync failed",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "IT-TKT-1022",
    customer: "Sarah Johnson",
    issue: "Router offline - needs restart",
    priority: "Critical",
    status: "Open",
  },
  {
    id: "IT-TKT-1021",
    customer: "Mike Davis",
    issue: "High latency reported",
    priority: "Medium",
    status: "Investigating",
  },
  {
    id: "IT-TKT-1020",
    customer: "Emily Brown",
    issue: "Device configuration backup",
    priority: "Low",
    status: "Pending",
  },
  {
    id: "IT-TKT-1019",
    customer: "Robert Wilson",
    issue: "Network performance degradation",
    priority: "High",
    status: "In Progress",
  },
];

const systemAlerts = [
  {
    id: 1,
    message: "Mikrotik API sync failed (3 retries)",
    severity: "error",
    time: "5 min ago",
  },
  {
    id: 2,
    message: "Device 'Router-01' is offline",
    severity: "critical",
    time: "12 min ago",
  },
  {
    id: 3,
    message: "High packet loss detected on Router-03",
    severity: "warning",
    time: "25 min ago",
  },
  {
    id: 4,
    message: "Bandwidth threshold exceeded on Router-02",
    severity: "warning",
    time: "1 hour ago",
  },
];

export function ITOperationsDashboard() {
  const { isDarkMode } = useTheme();
  
  const ticketColumns = [
    { label: "Ticket ID", key: "id" },
    { label: "Customer", key: "customer" },
    { label: "Issue", key: "issue" },
    {
      label: "Priority",
      key: "priority",
      render: (value: string) => {
        const variant =
          value === "Critical" ? "destructive" :
          value === "High" ? "destructive" :
          value === "Medium" ? "default" : "secondary";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    {
      label: "Status",
      key: "status",
      render: (value: string) => {
        const variant =
          value === "Open" ? "default" :
          value === "In Progress" ? "default" : "secondary";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>IT Operations Dashboard</h2>
        <p className="text-muted-foreground">Monitor network infrastructure and manage IT tickets</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Column - 2/3 width */}
        <div className="space-y-6 lg:col-span-2">
          {/* Assigned IT Tickets */}
          <DataTable
            title="My Assigned IT Tickets"
            columns={ticketColumns}
            data={assignedTickets}
          />

          {/* Network Latency Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Network Latency (Last 24 Hours)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e2e8f0"} />
                  <XAxis 
                    dataKey="time" 
                    stroke={isDarkMode ? "#9ca3af" : "#64748b"}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke={isDarkMode ? "#9ca3af" : "#64748b"}
                    style={{ fontSize: '12px' }}
                    label={{ value: 'ms', position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${isDarkMode ? '#374151' : '#e2e8f0'}`,
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="latency" 
                    stroke="#14b8a6" 
                    strokeWidth={2}
                    dot={{ fill: '#14b8a6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Average Latency: <span className="text-foreground">20.5ms</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column - 1/3 width */}
        <div className="space-y-6">
          {/* Network Device Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Network Device Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Mikrotik Routers Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                      4/5
                    </Badge>
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
                <div className="ml-6 text-xs text-muted-foreground">
                  1 device offline - Router-01
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Packet Loss</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                    0.2%
                  </Badge>
                </div>
                <div className="ml-0 text-xs text-muted-foreground">
                  Within normal range
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Connections</span>
                  <span className="text-sm">487</span>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bandwidth Usage</span>
                  <span className="text-sm">68%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Recent System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="space-y-1 rounded-lg border border-border bg-muted/50 p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle 
                      className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                        alert.severity === 'critical' ? 'text-red-500' :
                        alert.severity === 'error' ? 'text-red-500' :
                        'text-yellow-500'
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
