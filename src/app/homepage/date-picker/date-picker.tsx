"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import DatePicker from "@/registry/neutral/blocks/DatePicker";

export default function BlockDatePickerPage() {
  const [copied, setCopied] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleCopy = async () => {
    const command = "npx shadcn add datepicker";

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
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
          <h1 className="text-4xl font-bold tracking-tight">Date Picker Component</h1>
          <p className="text-muted-foreground">
            A modern, accessible, and reusable date picker built with{" "}
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
              This Date Picker component provides a sleek and lightweight interface
              for selecting dates. It defaults to today’s date and supports dynamic
              updates when the user selects a new one. Designed with accessibility
              and reusability in mind, it fits seamlessly into modern dashboards and forms.
            </p>
          </CardContent>
        </Card>

        {/* CLI Command Section */}
        <Card className="border-primary/40 border-2 bg-muted/30">
          <CardContent className="flex items-center justify-between p-4">
            <code className="text-sm font-mono text-primary">
              npx shadcn add datepicker
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
            <div className="border rounded-md p-6 bg-muted/40 flex flex-col items-center justify-center gap-4">
              <DatePicker onChange={(d) => setSelectedDate(d)} />
              <p className="text-sm text-muted-foreground">
                Selected Date:{" "}
                <span className="font-medium text-foreground">
                  {selectedDate || "—"}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
