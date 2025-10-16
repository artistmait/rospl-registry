"use client";

import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
  onChange?: (date: string) => void;
  className?: string;
}

export default function DatePicker({ onChange, className = "" }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
    onChange?.(format(date, "yyyy-MM-dd"));
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setIsYearDropdownOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) days.push(null as unknown as Date);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i); // +/-50 years

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Input Field */}
      <Button
        variant="outline"
        className="w-56 justify-between border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
        onClick={() => setIsOpen((p) => !p)}
      >
        {format(selectedDate, "PPP")}
        <CalendarIcon className="h-4 w-4 opacity-60" />
      </Button>

      {/* Dropdown Calendar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-xl p-4"
          >
            {/* Month & Year Header */}
            <div className="flex items-center justify-between mb-3 space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleMonthChange("prev")}
                className="hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Month */}
              <span className="font-semibold text-gray-700">{format(currentMonth, "MMMM")}</span>

              {/* Year Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsYearDropdownOpen((p) => !p)}
                  className="text-gray-700 hover:bg-gray-100"
                >
                  {currentMonth.getFullYear()}
                </Button>
                {isYearDropdownOpen && (
                  <div className="absolute z-50 mt-1 max-h-40 w-24 overflow-y-auto rounded border border-gray-200 bg-white shadow-lg">
                    {years.map((year) => (
                      <div
                        key={year}
                        className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                        onClick={() => handleYearSelect(year)}
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleMonthChange("next")}
                className="hover:bg-gray-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
              {weekdays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 text-center gap-1">
              {days.map((day, i) =>
                day ? (
                  <button
                    key={i}
                    onClick={() => handleDateClick(day)}
                    className={`h-9 w-9 rounded-full text-sm transition-colors
                      ${
                        format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                          ? "bg-black text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    {day.getDate()}
                  </button>
                ) : (
                  <div key={i} />
                )
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between mt-3 text-sm text-gray-600">
              <button
                onClick={() => {
                  const today = new Date();
                  setSelectedDate(today);
                  setCurrentMonth(today);
                  onChange?.(format(today, "yyyy-MM-dd"));
                }}
                className="hover:text-black"
              >
                Today
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="hover:text-black"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
