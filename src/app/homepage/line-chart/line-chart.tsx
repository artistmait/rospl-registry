"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import LineChartComponent from "@/registry/neutral/blocks/LineChart";

export default function BlockLineChartPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const command = "npx shadcn add linechart";

    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
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

  const sampleData = [
    { month: "Jan", sales: 400, revenue: 240 },
    { month: "Feb", sales: 300, revenue: 139 },
    { month: "Mar", sales: 200, revenue: 980 },
    { month: "Apr", sales: 278, revenue: 390 },
    { month: "May", sales: 189, revenue: 480 },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header Section */}
        <section className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Line Chart Component
          </h1>
          <p className="text-muted-foreground">
            A modern, customizable, and reusable{" "}
            <span className="font-semibold text-primary">Line Chart</span> built
            with <span className="font-semibold text-primary">TypeScript</span>,{" "}
            <span className="font-semibold text-primary">Tailwind CSS</span>,
            and <span className="font-semibold text-primary">Recharts</span>.
          </p>
        </section>

        {/* Description Section */}
        <Card className="border-primary/30 border-2 bg-muted/40">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This Line Chart component offers a sleek, responsive, and modular
              UI for visualizing data trends. With customizable colors, dynamic
              legends, and tooltips, it’s ideal for dashboards and analytics
              pages. Optimized with <code>React.memo</code> for performance and
              built with a minimalist blue-black-grey color palette for clarity
              and focus.
            </p>
          </CardContent>
        </Card>

        {/* CLI Command Section */}
        <Card className="border-primary/40 border-2 bg-muted/30">
          <CardContent className="flex items-center justify-between p-4">
            <code className="text-sm font-mono text-primary">
              npx shadcn add linechart
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
            <div className="border rounded-md p-6 bg-muted/40 flex flex-col items-center justify-center gap-4 w-full">
              <div className="w-full max-w-2xl">
                <LineChartComponent
                  data={sampleData}
                  xKey="month"
                  lineKeys={["sales", "revenue"]}
                  title="Monthly Sales vs Revenue"
                  height={320}
                  lineColors={["#3B82F6", "#60A5FA"]}
                  gridColor="#1e293b"
                  bgColor="#0f172a"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
