import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useState } from "react";

interface GenerateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportName: string;
  onRunReport: () => void;
}

export function GenerateReportModal({
  open,
  onOpenChange,
  reportName,
  onRunReport,
}: GenerateReportModalProps) {
  const [dateRange, setDateRange] = useState("last30");
  const [customStartDate, setCustomStartDate] = useState<Date>();
  const [customEndDate, setCustomEndDate] = useState<Date>();

  const showTechnicianFilter = reportName.includes("Technician");
  const showTicketFilter = reportName.includes("Ticket");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate: {reportName}</DialogTitle>
          <DialogDescription>
            Configure filters and parameters for your report
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h4>Filters</h4>

            {/* Date Range */}
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 Days</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="thisQuarter">This Quarter</SelectItem>
                  <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Date Range */}
            {dateRange === "custom" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={customStartDate ? customStartDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setCustomStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={customEndDate ? customEndDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setCustomEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>
              </div>
            )}

            {/* Technician Filter */}
            {showTechnicianFilter && (
              <div className="space-y-2">
                <Label htmlFor="technician">Filter by Technician (Optional)</Label>
                <Select>
                  <SelectTrigger id="technician">
                    <SelectValue placeholder="All Technicians" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Technicians</SelectItem>
                    <SelectItem value="tech1">Mike Johnson</SelectItem>
                    <SelectItem value="tech2">Sarah Williams</SelectItem>
                    <SelectItem value="tech3">David Brown</SelectItem>
                    <SelectItem value="tech4">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Ticket Category Filter */}
            {showTicketFilter && (
              <div className="space-y-2">
                <Label htmlFor="category">Filter by Ticket Category (Optional)</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="installation">Installation</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="upgrade">Upgrade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onRunReport}>Run Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
