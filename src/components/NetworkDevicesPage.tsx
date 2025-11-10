import { useState } from "react";
import { DataTable } from "./DataTable";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Server, Plus, MoreVertical } from "lucide-react";
import { DeviceDetailsModal } from "./DeviceDetailsModal";
import { Modal_AddNetworkDevice } from "./Modal_AddNetworkDevice";
import { Modal_RemoveNetworkDevice } from "./Modal_RemoveNetworkDevice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "../contexts/LanguageContext";

interface NetworkDevice {
  id: string;
  name: string;
  status: "Online" | "Offline";
  ipAddress: string;
  uptime: string;
  latency: string;
}

const networkDevices: NetworkDevice[] = [
  {
    id: "DEV-001",
    name: "Router-01",
    status: "Offline",
    ipAddress: "192.168.1.1",
    uptime: "0d 0h 0m",
    latency: "—",
  },
  {
    id: "DEV-002",
    name: "Router-02",
    status: "Online",
    ipAddress: "192.168.1.2",
    uptime: "24d 1h 5m",
    latency: "15ms",
  },
  {
    id: "DEV-003",
    name: "Router-03",
    status: "Online",
    ipAddress: "192.168.1.3",
    uptime: "18d 14h 22m",
    latency: "18ms",
  },
  {
    id: "DEV-004",
    name: "Router-04",
    status: "Online",
    ipAddress: "192.168.1.4",
    uptime: "32d 7h 45m",
    latency: "12ms",
  },
  {
    id: "DEV-005",
    name: "Router-05",
    status: "Online",
    ipAddress: "192.168.1.5",
    uptime: "15d 3h 18m",
    latency: "21ms",
  },
];

export function NetworkDevicesPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [showRemoveDeviceModal, setShowRemoveDeviceModal] = useState(false);
  const [deviceToRemove, setDeviceToRemove] = useState<NetworkDevice | null>(null);

  const handleViewDetails = (device: NetworkDevice) => {
    setSelectedDevice(device);
    setShowDeviceModal(true);
  };

  const filteredDevices = networkDevices.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.ipAddress.includes(searchQuery)
  );

  const deviceColumns = [
    {
      label: "Device Name",
      key: "name",
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      label: "Status",
      key: "status",
      render: (value: string) => {
        const variant = value === "Online" ? "default" : "destructive";
        const className = value === "Online" 
          ? "bg-green-500/10 text-green-600 border-green-500/20" 
          : "bg-red-500/10 text-red-600 border-red-500/20";
        return (
          <Badge variant={variant} className={className}>
            {value}
          </Badge>
        );
      },
    },
    { label: "IP Address", key: "ipAddress" },
    { label: "Uptime", key: "uptime" },
    { label: "Latency", key: "latency" },
    {
      label: t("Actions"),
      key: "id",
      render: (_value: string, row: NetworkDevice) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t("Open actions menu")}>
              <MoreVertical className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewDetails(row)}>
              {t("View Details")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Rebooting ${row.name}...`)}>
              {t("Reboot Device")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                setDeviceToRemove(row);
                setShowRemoveDeviceModal(true);
              }}
            >
              {t("Remove Device")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Network Device Management (Mikrotik)</h2>
          <p className="text-muted-foreground">
            Monitor device health and manage router configurations
          </p>
        </div>
        <Button onClick={() => setShowAddDeviceModal(true)}>
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          {t("Add New Device")}
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by device name or IP address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            {networkDevices.filter(d => d.status === "Online").length} Online
          </Badge>
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
            {networkDevices.filter(d => d.status === "Offline").length} Offline
          </Badge>
        </div>
      </div>

      {/* Devices Table */}
      <DataTable
        title="Connected Network Devices"
        columns={deviceColumns}
        data={filteredDevices}
      />

      {/* Modals */}
      <Modal_AddNetworkDevice
        open={showAddDeviceModal}
        onOpenChange={setShowAddDeviceModal}
      />

      <Modal_RemoveNetworkDevice
        open={showRemoveDeviceModal}
        onOpenChange={setShowRemoveDeviceModal}
        deviceName={deviceToRemove?.name}
      />

      {selectedDevice && (
        <DeviceDetailsModal
          device={selectedDevice}
          open={showDeviceModal}
          onOpenChange={setShowDeviceModal}
        />
      )}
    </div>
  );
}
