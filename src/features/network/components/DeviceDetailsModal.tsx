import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Server, 
  Activity, 
  Wifi, 
  Users, 
  AlertTriangle,
  Settings,
  Zap
} from "lucide-react";
import { RebootDeviceModal } from "./RebootDeviceModal";

interface NetworkDevice {
  id: string;
  name: string;
  status: "Online" | "Offline";
  ipAddress: string;
  uptime: string;
  latency: string;
}

interface DeviceDetailsModalProps {
  device: NetworkDevice;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeviceDetailsModal({ device, open, onOpenChange }: DeviceDetailsModalProps) {
  const [showRebootModal, setShowRebootModal] = useState(false);
  const [commandExecuting, setCommandExecuting] = useState(false);

  const handleRunBandwidthCommand = () => {
    setCommandExecuting(true);
    // Simulate command execution
    setTimeout(() => {
      setCommandExecuting(false);
      alert("Bandwidth limit command executed successfully");
    }, 1500);
  };

  const handleRebootClick = () => {
    setShowRebootModal(true);
  };

  const handleRebootConfirm = () => {
    setShowRebootModal(false);
    onOpenChange(false);
    // Simulate reboot
    alert(`Device ${device.name} is being rebooted. This action has been logged.`);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Device Details: {device.name}
            </DialogTitle>
            <DialogDescription>
              View device status, configuration, and perform management actions
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="status" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="status">Status</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            {/* Status Tab */}
            <TabsContent value="status" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Device Information */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Device Status</span>
                        <Badge 
                          variant={device.status === "Online" ? "default" : "destructive"}
                          className={device.status === "Online" 
                            ? "bg-green-500/10 text-green-600 border-green-500/20" 
                            : "bg-red-500/10 text-red-600 border-red-500/20"
                          }
                        >
                          {device.status}
                        </Badge>
                      </div>
                      
                      <div className="h-px bg-border" />
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">IP Address:</span>
                          <span>{device.ipAddress}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Live Uptime:</span>
                          <span>{device.status === "Online" ? device.uptime : "—"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Metrics */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">Live Latency</span>
                        </div>
                        <span className="text-sm">
                          {device.status === "Online" ? device.latency : "—"}
                        </span>
                      </div>

                      <div className="h-px bg-border" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-muted-foreground">Live Packet Loss</span>
                        </div>
                        <span className="text-sm">
                          {device.status === "Online" ? "0.1%" : "—"}
                        </span>
                      </div>

                      <div className="h-px bg-border" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-teal-600" />
                          <span className="text-sm text-muted-foreground">Connected Clients</span>
                        </div>
                        <span className="text-sm">
                          {device.status === "Online" ? "120" : "0"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Live Stats */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">CPU Usage</p>
                      <p className="text-2xl">{device.status === "Online" ? "23%" : "—"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Memory Usage</p>
                      <p className="text-2xl">{device.status === "Online" ? "45%" : "—"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="text-2xl">{device.status === "Online" ? "42°C" : "—"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuration Tab */}
            <TabsContent value="configuration" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      <h3 className="text-sm">Device Configuration</h3>
                    </div>
                    <div className="rounded-lg border border-border bg-muted p-4">
                      <pre className="text-xs overflow-x-auto">
{`# RouterOS Configuration Export
# Device: ${device.name}
# Model: MikroTik RB4011
# RouterOS Version: 7.11.2

/interface ethernet
set [ find default-name=ether1 ] name=ether1-wan
set [ find default-name=ether2 ] name=ether2-lan

/ip address
add address=${device.ipAddress}/24 interface=ether1-wan
add address=10.0.0.1/24 interface=ether2-lan

/ip pool
add name=dhcp-pool ranges=10.0.0.100-10.0.0.200

/ip dhcp-server
add address-pool=dhcp-pool interface=ether2-lan name=dhcp1

/ip firewall nat
add action=masquerade chain=srcnat out-interface=ether1-wan

/system identity
set name=${device.name}

# Bandwidth limiting rules
/queue simple
add max-limit=100M/100M name=client-limit target=10.0.0.0/24

# End of configuration`}
                      </pre>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This is a read-only view of the device configuration. 
                      Contact your system administrator to make changes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-4">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="text-sm mb-2">Device Management Actions</h3>
                    <p className="text-sm text-muted-foreground">
                      Perform critical operations on this network device. All actions are logged for audit purposes.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Bandwidth Limit Command */}
                    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm">Run Bandwidth Limit Command</h4>
                          <p className="text-xs text-muted-foreground">
                            Execute bandwidth throttling rules on this device. This will apply predefined 
                            bandwidth limits to customer connections.
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleRunBandwidthCommand}
                        disabled={device.status === "Offline" || commandExecuting}
                      >
                        {commandExecuting ? "Executing..." : "Run Bandwidth Limit Command"}
                      </Button>
                    </div>

                    {/* Reboot Device */}
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm">Reboot Device</h4>
                          <p className="text-xs text-muted-foreground">
                            Restart the network device. This will cause a temporary service interruption 
                            for all connected customers. Use only when necessary.
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={handleRebootClick}
                        disabled={device.status === "Offline"}
                      >
                        Reboot Device
                      </Button>
                    </div>
                  </div>

                  {device.status === "Offline" && (
                    <div className="rounded-lg border border-border bg-muted p-3">
                      <p className="text-sm text-muted-foreground">
                        ⚠️ Device is currently offline. Actions are disabled until the device comes back online.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Reboot Confirmation Modal */}
      <RebootDeviceModal
        deviceName={device.name}
        open={showRebootModal}
        onOpenChange={setShowRebootModal}
        onConfirm={handleRebootConfirm}
      />
    </>
  );
}
