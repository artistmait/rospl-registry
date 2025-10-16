"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const components = [
  {
    name: "Navbar",
    description: "A responsive, customizable navigation bar where in you can add to it.",
    href: "/homepage/block",
  },
  {
    name: "Table",
    description: "A sleek and reusable data table with sorting, search, and pagination.",
    href: "/homepage/table",
  },
  {
    name: "Date Picker",
    description: "A modern, accessible date picker built with shadcn/ui.",
    href: "/homepage/date-picker",
  },
  {
    name: "Line Chart",
    description: "A responsive line chart using Recharts and Tailwind styling.",
    href: "/homepage/line-chart",
  },
  // {
  //   name: "Modal",
  //   description: "A minimal and accessible modal dialog component.",
  //   href: "/homepage/modal",
  // },
];

export default function HomePage() {
  const router = useRouter();

  return (
     <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-200 px-6 py-20">
      <div className="max-w-6xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
            UI Component Blocks
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            Browse sleek, reusable, production-ready components built with{" "}
            <span className="font-semibold text-black">shadcn/ui</span> &{" "}
            <span className="font-semibold text-black">Tailwind CSS</span>.
          </p>
        </div>

        {/* Components Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {components.map((block, index) => (
            <motion.div
              key={block.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card
                onClick={() => router.push(block.href)}
                className="cursor-pointer group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-2xl font-semibold text-neutral-900 group-hover:text-black transition-colors">
                      {block.name}
                    </h2>
                    <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                  <div className="flex justify-end mt-6">
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/40 to-neutral-300/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
