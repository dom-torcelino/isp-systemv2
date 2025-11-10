import { useState } from "react";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { CreateArticleModal } from "./CreateArticleModal";

const articlesData = [
  {
    id: "1",
    title: "How to Troubleshoot Connection Issues",
    category: "Tech Support",
    author: "Alice Cooper",
    lastUpdated: "Nov 2, 2025",
  },
  {
    id: "2",
    title: "Understanding Billing Cycles",
    category: "Billing",
    author: "Bob Wilson",
    lastUpdated: "Oct 28, 2025",
  },
  {
    id: "3",
    title: "Installation Checklist for Fiber",
    category: "Installation",
    author: "Mike Johnson",
    lastUpdated: "Oct 25, 2025",
  },
  {
    id: "4",
    title: "Customer Account Suspension Process",
    category: "Billing",
    author: "Alice Cooper",
    lastUpdated: "Oct 20, 2025",
  },
  {
    id: "5",
    title: "How to Handle Escalated Tickets",
    category: "Tech Support",
    author: "Sarah Williams",
    lastUpdated: "Oct 15, 2025",
  },
];

export function KnowledgeBaseTab() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const articleColumns = [
    { label: "Article Title", key: "title" },
    { label: "Category", key: "category" },
    { label: "Author", key: "author" },
    { label: "Last Updated", key: "lastUpdated" },
    {
      label: "Actions",
      key: "id",
      render: () => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="outline">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3>Internal Knowledge Base</h3>
          <p className="text-muted-foreground text-sm">
            Create and manage articles for your support staff and technicians
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Article
        </Button>
      </div>

      <DataTable columns={articleColumns} data={articlesData} />

      <CreateArticleModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  );
}
