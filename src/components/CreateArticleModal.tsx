import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

interface CreateArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateArticleModal({ open, onOpenChange }: CreateArticleModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // Handle article creation
    console.log("Creating article:", { title, category, content });
    onOpenChange(false);
    // Reset form
    setTitle("");
    setCategory("");
    setContent("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Knowledge Base Article</DialogTitle>
          <DialogDescription>
            Create a new article for your support team and technicians
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="article-title">Article Title</Label>
            <Input
              id="article-title"
              placeholder="Enter article title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="article-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech-support">Tech Support</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="installation">Installation</SelectItem>
                <SelectItem value="repair">Repair</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="article-content">Article Content</Label>
            <Textarea
              id="article-content"
              placeholder="Write your article content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
            <p className="text-muted-foreground text-xs">
              Use markdown formatting for headings, lists, and emphasis
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Article</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
