import type { TripHotel } from "@/data/types";

const cell = "px-4 py-3.5";

/** "Where you'll stay". On narrow screens the table scrolls sideways inside its own box, never the page. */
export function HotelsTable({ hotels, caption }: { hotels: TripHotel[]; caption: string }) {
  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className="overflow-x-auto rounded-card border border-line"
    >
      <table className="w-full min-w-[560px] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-paper">
            <th scope="col" className={`${cell} font-semibold`}>City</th>
            <th scope="col" className={`${cell} font-semibold`}>Hotel or similar</th>
            <th scope="col" className={`${cell} font-semibold`}>Category</th>
            <th scope="col" className={`${cell} font-semibold`}>Stay</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => (
            <tr key={`${hotel.city}-${hotel.name}-${index}`} className="border-t border-line">
              <td className={cell}>{hotel.city}</td>
              <td className={`${cell} font-medium`}>{hotel.name}</td>
              <td className={cell}>{hotel.category}</td>
              <td className={cell}>
                {hotel.nights} {hotel.nights === 1 ? "night" : "nights"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
