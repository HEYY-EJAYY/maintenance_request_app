// Constants for the app

import { CategoryCard } from "../types";

export const CATEGORIES: CategoryCard[] = [
  {
    id: "1",
    name: "Plumbing / Leaks",
    icon: "🔧",
    color: "#93c5fd",
    type: "plumbing",
  },
  {
    id: "2",
    name: "Electrical / Power",
    icon: "⚡",
    color: "#fcd34d",
    type: "electrical",
  },
  {
    id: "3",
    name: "Security / Gates",
    icon: "🏠",
    color: "#86efac",
    type: "security",
  },
  {
    id: "4",
    name: "General",
    icon: "⚙️",
    color: "#e5e7eb",
    type: "general",
  },
];

export const MOCK_REQUESTS = [
  {
    id: "REQ-2025-0012",
    title: "Leaking faucet in kitchen",
    description: "Technician Arhan C. is assigned and repairing parts.",
    category: "plumbing" as const,
    status: "ongoing" as const,
    unitNumber: "A101",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-14"),
    assignedTechnician: "Arhan C.",
  },
  {
    id: "REQ-2025-0003",
    title: "Circuit breaker affecting the lights",
    description: "Technician Arhan C. is assigned",
    category: "electrical" as const,
    status: "in-progress" as const,
    unitNumber: "A101",
    createdAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-14"),
    assignedTechnician: "Arhan C.",
  },
  {
    id: "REQ-2025-0101",
    title: "Loose wire connection",
    description: "Request received and awaiting maintenance crew assignment.",
    category: "electrical" as const,
    status: "in-progress" as const,
    unitNumber: "A101",
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-14"),
  },
  {
    id: "REQ-2025-0401",
    title: "Community pool lights are out",
    description: "Request received and awaiting maintenance crew assignment.",
    category: "general" as const,
    status: "in-progress" as const,
    unitNumber: "Common Area",
    createdAt: new Date("2025-01-13"),
    updatedAt: new Date("2025-01-14"),
  },
];
