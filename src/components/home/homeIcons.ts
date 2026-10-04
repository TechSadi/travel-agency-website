import { FileText, Headphones, ShieldCheck, Tag, Users, type LucideIcon } from "lucide-react";
import type { HomeIconKey } from "@/data/home";

/** DESIGN.md section 3 icon mapping for the Home trust row and service features. */
export const homeIcons: Record<HomeIconKey, LucideIcon> = {
  users: Users,
  visa: FileText,
  price: Tag,
  support: Headphones,
  safety: ShieldCheck,
};
