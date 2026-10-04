import { BedDouble, Camera, Car, FileText, Plane, Users, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { Inclusion } from "@/data/types";

/**
 * DESIGN.md section 3 icon mapping, extended to every card label the way
 * design-reference/trips.html draws them: stays share the bed, ground and water
 * transport share the car, tours share the camera.
 */
export const inclusionIcons: Record<Inclusion, LucideIcon> = {
  Flights: Plane,
  Hotels: BedDouble,
  Resort: BedDouble,
  Lodges: BedDouble,
  Meals: UtensilsCrossed,
  "All meals": UtensilsCrossed,
  Breakfast: UtensilsCrossed,
  Transfers: Car,
  Ferries: Car,
  "Rail passes": Car,
  "Game drives": Car,
  Sightseeing: Camera,
  "Boat tours": Camera,
  Visa: FileText,
  Guide: Users,
};
