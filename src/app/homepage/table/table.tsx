"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import Table from "@/registry/neutral/blocks/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "Mei Chen", email: "mei@example.com", role: "Admin" },
  { id: 2, name: "Raj Kumar", email: "raj@example.com", role: "Editor" },
  { id: 3, name: "Ava Lee", email: "ava@example.com", role: "Viewer" },
  { id: 4, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 5, name: "Sara Kim", email: "sara@example.com", role: "Editor" },
  { id: 6, name: "Arjun Patel", email: "arjun@example.com", role: "Viewer" },
  { id: 7, name: "Lisa Wang", email: "lisa@example.com", role: "Admin" },
  { id: 8, name: "Noah Lee", email: "noah@example.com", role: "Viewer" },
];

import type { Column } from "@/registry/neutral/blocks/DataTable";

const columns: Column<User>[] = [
  { key: "id", header: "ID", sortable: true },
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", sortable: true },
];

export default function BlockTablePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const command = "npx shadcn add table";

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Fallback when Clipboard API unavailable
      const textarea = document.createElement("textarea");
      textarea.value = command;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      toast.success("Copied to clipboard (fallback)!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header Section */}
        <section className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Table Component</h1>
          <p className="text-muted-foreground">
            A sleek, reusable data table built with{" "}
            <span className="font-semibold text-primary">TypeScript</span>,{" "}
            <span className="font-semibold text-primary">Tailwind CSS</span>, and{" "}
            <span className="font-semibold text-primary">shadcn/ui</span>.
          </p>
        </section>

        {/* Description Section */}
        <Card className="border-primary/30 border-2 bg-muted/40">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This Table component is a fully-typed, generic, and reusable data display system.
              It supports search, pagination, and sorting out of the box, making it perfect
              for admin dashboards or CRUD interfaces. It’s lightweight, theme-friendly, and
              easy to extend.
            </p>
          </CardContent>
        </Card>

        {/* CLI Command Section */}
        <Card className="border-primary/40 border-2 bg-muted/30">
          <CardContent className="flex items-center justify-between p-4">
            <code className="text-sm font-mono text-primary">
              npx shadcn add table
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              aria-label="Copy command"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="bg-background/60 border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="border rounded-md p-4 bg-muted/40">
              <Table data={users} columns={columns} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
