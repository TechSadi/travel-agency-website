import { tripVariants, variantOf } from "./moreTrips";
import type { Departure, Trip } from "./types";

// Card fields (title, place, price, rating, badge, inclusions, image) follow
// design-reference/trips.html. Kashmir detail content follows trip-kashmir.html.

const coreTrips: Trip[] = [
  {
    slug: "kashmir-paradise-on-earth",
    title: "Kashmir: Paradise on Earth",
    destinationSlug: "kashmir",
    place: "Kashmir, India",
    nights: 6,
    days: 7,
    priceFrom: 32999,
    priceWas: 36999,
    rating: 4.8,
    reviewCount: 126,
    badge: "Bestseller",
    types: ["family", "honeymoon", "group"],
    inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing"],
    heroImage: "/images/kashmir.jpg",
    gallery: [
      { src: "/images/kashmir.jpg", alt: "Turquoise mountain lake ringed by pine forest" },
      { src: "/images/honeymoon-boat.jpg", alt: "Couple on a decorated boat" },
      { src: "/images/hero.jpg", alt: "Snowy peaks" },
      { src: "/images/family.jpg", alt: "Family at sunset" },
      { src: "/images/group.jpg", alt: "Group of friends on a trek" },
    ],
    stops: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
    facts: {
      startsAndEnds: "Srinagar",
      groupSize: "2 to 20 people",
      bestTime: "March to October",
      flights: "From Vadodara or Ahmedabad",
    },
    overview:
      "Seven days through the Kashmir valley, from a houseboat on Dal Lake to the meadows of Gulmarg and the pine forests of Pahalgam. The pace is relaxed, with no early starts, so it suits couples, families with young children and grandparents alike.",
    highlights: [
      "A night on a Dal Lake houseboat",
      "Gondola ride up to Kongdori in Gulmarg",
      "Betaab and Aru valleys in Pahalgam",
      "Thajiwas glacier at Sonamarg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Srinagar",
        description:
          "Pick-up from Srinagar airport and check in to a deluxe houseboat on Dal Lake. Evening shikara ride past the floating markets.",
        tags: ["Houseboat stay", "Shikara ride", "Dinner"],
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg",
        description:
          "A two-hour drive through Tangmarg to Gulmarg. Ride the gondola up to Kongdori for views of Mount Apharwat, then spend the afternoon on the meadow.",
        tags: ["Gondola, phase 1", "Hotel in Gulmarg"],
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam",
        description:
          "Drive past the saffron fields of Pampore and the Avantipur temple ruins on the way to Pahalgam. Evening walk along the Lidder river.",
        tags: ["Saffron fields", "Lidder river"],
      },
      {
        day: 4,
        title: "Pahalgam valleys",
        description:
          "A local union cab takes you to Betaab valley, Aru valley and Chandanwari. The afternoon is free to rest by the river or try a pony ride.",
        tags: ["Betaab valley", "Aru valley", "Chandanwari"],
      },
      {
        day: 5,
        title: "Day trip to Sonamarg",
        description:
          "After breakfast, drive up the Sindh valley to Sonamarg and walk or ride to Thajiwas glacier. Continue to Srinagar for the night. This is the longest drive of the trip, with tea stops along the way.",
        tags: ["Thajiwas glacier", "Hotel in Srinagar"],
      },
      {
        day: 6,
        title: "Mughal gardens and shopping",
        description:
          "Visit Nishat Bagh, Shalimar Bagh and Chashme Shahi, then the Hazratbal shrine. Evening free to shop for pashmina, walnuts and saffron at Lal Chowk.",
        tags: ["Mughal gardens", "Hazratbal", "Shopping"],
      },
      {
        day: 7,
        title: "Fly home",
        description:
          "Breakfast at the hotel, then a drop at Srinagar airport for your flight home to Ahmedabad.",
        tags: ["Airport drop"],
      },
    ],
    included: [
      "Return flights from Ahmedabad",
      "6 nights in 3-star and 4-star hotels and a houseboat",
      "Daily breakfast and dinner",
      "Private car for all transfers and sightseeing",
      "Gulmarg gondola, phase 1",
      "Shikara ride on Dal Lake",
    ],
    excluded: [
      "Lunch and personal expenses",
      "Pony rides and local union cabs in Pahalgam",
      "Travel insurance",
      "GST at 5%",
    ],
    hotels: [
      { city: "Srinagar", name: "Royal Heritage Houseboat", category: "Deluxe", nights: 1 },
      { city: "Gulmarg", name: "Hotel Highlands Park", category: "4 star", nights: 1 },
      { city: "Pahalgam", name: "Pine Spring Resort", category: "4 star", nights: 2 },
      { city: "Srinagar", name: "Hotel Grand Mumtaz", category: "3 star", nights: 2 },
    ],
    faqs: [
      {
        q: "Is Kashmir safe for families right now?",
        a: "Yes. We have sent over 300 families to Kashmir in the last year, and our local team checks conditions before every departure.",
      },
      {
        q: "Can we add extra nights or change hotels?",
        a: "Yes. Most families add a second houseboat night or an extra day in Pahalgam. We can also upgrade any hotel; we will send the price difference before you confirm.",
      },
      {
        q: "What should we pack in December?",
        a: "Expect snow in Gulmarg and night temperatures below zero. Pack thermals, a down jacket, gloves, a woollen cap and waterproof shoes. Snow boots and long coats can be hired in Gulmarg for a few hundred rupees.",
      },
      {
        q: "How much is the booking amount?",
        a: "A token of ₹5,000 per person holds your seats for 48 hours. The balance is due 21 days before departure.",
      },
    ],
    departures: [
      { date: "2026-11-22", fromCity: "Ahmedabad", seatsLeft: 3, price: 32999 },
      { date: "2026-12-06", fromCity: "Vadodara", seatsLeft: 9, price: 32999 },
    ],
  },

  {
    slug: "maldives-overwater-escape",
    title: "Maldives Overwater Escape",
    destinationSlug: "maldives",
    place: "Maldives",
    nights: 4,
    days: 5,
    priceFrom: 84999,
    rating: 4.9,
    reviewCount: 88,
    badge: "Honeymoon",
    types: ["honeymoon", "beach"],
    inclusions: ["Flights", "Resort", "Meals", "Transfers"],
    heroImage: "/images/maldives-couple.jpg",
    gallery: [
      { src: "/images/maldives-couple.jpg", alt: "Couple on the deck of an overwater villa" },
      { src: "/images/couple-beach.jpg", alt: "Couple walking along a white sand beach" },
      { src: "/images/honeymoon-boat.jpg", alt: "Couple on a decorated boat at sunset" },
      { src: "/images/palawan.jpg", alt: "Clear lagoon water over a coral reef" },
      { src: "/images/family.jpg", alt: "Family watching the sunset by the sea" },
    ],
    stops: ["Malé", "Rasdhoo Atoll"],
    facts: {
      startsAndEnds: "Malé",
      groupSize: "2 to 12 people",
      bestTime: "November to April",
      flights: "From Mumbai",
    },
    overview:
      "Four nights on one island in Rasdhoo Atoll, reached by a 20-minute seaplane from Malé. You spend two nights in a beach villa and two in an overwater villa, with all meals included and an Indian chef in the kitchen. There is nothing to organise once you land, which is the point.",
    highlights: [
      "Seaplane flight over the atolls",
      "Two nights in an overwater villa",
      "Snorkelling on the house reef",
      "Sunset dolphin cruise",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Malé, seaplane to the resort",
        description:
          "Our resort host meets you at Velana airport for the seaplane to Kuramathi. Check in to your beach villa and watch the sunset from the sandbank at the tip of the island.",
        tags: ["Seaplane transfer", "Beach villa", "Dinner"],
      },
      {
        day: 2,
        title: "Reef and lagoon",
        description:
          "Snorkel the house reef straight from the beach, where turtles and reef sharks are common. Afternoon free for the pool or a spa treatment.",
        tags: ["Snorkelling", "All meals"],
      },
      {
        day: 3,
        title: "Move to your water villa",
        description:
          "After a late breakfast, move to an overwater villa with steps down into the lagoon. In the evening, a sunset cruise goes looking for spinner dolphins.",
        tags: ["Water villa", "Dolphin cruise"],
      },
      {
        day: 4,
        title: "A free day at the resort",
        description:
          "Kayak, paddleboard or simply stay in. Couples get a private candlelit dinner on the beach; families can book the kids' club instead.",
        tags: ["Candlelit dinner", "Free day"],
      },
      {
        day: 5,
        title: "Fly home",
        description:
          "Seaplane back to Malé in time for the afternoon flight to Mumbai.",
        tags: ["Seaplane transfer"],
      },
    ],
    included: [
      "Return flights from Mumbai to Malé",
      "4 nights at Kuramathi Maldives: 2 in a beach villa, 2 in a water villa",
      "Breakfast, lunch and dinner, with vegetarian and Jain options",
      "Return seaplane transfers",
      "Sunset dolphin cruise",
      "One candlelit beach dinner for couples",
    ],
    excluded: [
      "Maldives green tax, payable at the resort",
      "Drinks, minibar and diving",
      "Travel insurance",
      "GST at 5% and TCS as per current rules",
    ],
    hotels: [
      { city: "Rasdhoo Atoll", name: "Kuramathi Maldives, beach villa", category: "4 star", nights: 2 },
      { city: "Rasdhoo Atoll", name: "Kuramathi Maldives, water villa", category: "4 star", nights: 2 },
    ],
    faqs: [
      {
        q: "Do Indians need a visa for the Maldives?",
        a: "No. Indian passport holders get a free 30-day visa on arrival. You need a passport valid for six months, your return ticket and the resort booking, which we give you in one folder.",
      },
      {
        q: "Will we get vegetarian and Jain food?",
        a: "Yes. The resort has Indian chefs and keeps a separate vegetarian kitchen. Tell us your preferences when you book and we pass them on.",
      },
      {
        q: "Is there a baggage limit on the seaplane?",
        a: "Yes, usually 20 kg of checked baggage and 5 kg of hand baggage per person. Extra weight is charged at the airport, so pack light.",
      },
      {
        q: "Can we bring our children?",
        a: "Yes. For children under 12 we suggest beach villas for all four nights, since water villas have open decks over the sea.",
      },
    ],
    departures: [
      { date: "2026-11-28", fromCity: "Mumbai", seatsLeft: 8, price: 84999 },
      { date: "2026-12-26", fromCity: "Mumbai", seatsLeft: null, price: 84999 },
      { date: "2027-01-23", fromCity: "Mumbai", seatsLeft: 6, price: 84999 },
    ],
  },

  {
    slug: "dubai-city-lights",
    title: "Dubai City Lights",
    destinationSlug: "dubai",
    place: "Dubai, UAE",
    nights: 4,
    days: 5,
    priceFrom: 46999,
    priceWas: 49999,
    rating: 4.8,
    reviewCount: 214,
    badge: "Group departure",
    types: ["family", "group"],
    inclusions: ["Flights", "Hotels", "Visa", "Sightseeing"],
    heroImage: "/images/dubai.jpg",
    gallery: [
      { src: "/images/dubai.jpg", alt: "Dubai skyline lit up at dusk" },
      { src: "/images/family.jpg", alt: "Family enjoying the evening together" },
      { src: "/images/group.jpg", alt: "Group of friends on holiday" },
      { src: "/images/couple-beach.jpg", alt: "Couple walking on a beach" },
      { src: "/images/office-desk.jpg", alt: "Travel consultant preparing visa papers" },
    ],
    stops: ["Dubai", "Abu Dhabi"],
    facts: {
      startsAndEnds: "Dubai",
      groupSize: "10 to 35 people",
      bestTime: "November to March",
      flights: "From Ahmedabad or Mumbai",
    },
    overview:
      "Five easy days in Dubai with a Suman Holidays tour manager from start to finish. You see the city from the top of the Burj Khalifa, eat dinner on a dhow and in a desert camp, and spend a day in Abu Dhabi visiting the BAPS Hindu Mandir. Afternoons are kept light, so grandparents and small children keep up.",
    highlights: [
      "Burj Khalifa, levels 124 and 125",
      "Desert safari with barbecue dinner",
      "BAPS Hindu Mandir in Abu Dhabi",
      "Dhow cruise dinner at Dubai Marina",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Dubai",
        description:
          "Our tour manager meets the group at Dubai airport. Check in, rest, and board a dhow at Dubai Marina for a dinner cruise past the lit-up towers.",
        tags: ["Airport pick-up", "Dhow cruise", "Dinner"],
      },
      {
        day: 2,
        title: "City tour and Burj Khalifa",
        description:
          "Morning drive past Jumeirah Mosque, the Dubai Frame and Atlantis on the Palm. In the evening, go up the Burj Khalifa to level 124 and watch the Dubai Fountain from the mall.",
        tags: ["Burj Khalifa", "Dubai Mall", "Fountain show"],
      },
      {
        day: 3,
        title: "Miracle Garden and desert safari",
        description:
          "A late morning at the Dubai Miracle Garden, then out to the dunes for dune bashing, a camel ride and a barbecue dinner with tanoura and fire shows. Vegetarian food is served separately.",
        tags: ["Miracle Garden", "Desert safari", "Barbecue dinner"],
      },
      {
        day: 4,
        title: "Day trip to Abu Dhabi",
        description:
          "Drive to Abu Dhabi for darshan at the BAPS Hindu Mandir, then the Sheikh Zayed Grand Mosque and a photo stop at Ferrari World on Yas Island.",
        tags: ["BAPS Mandir", "Grand Mosque", "Yas Island"],
      },
      {
        day: 5,
        title: "Gold Souk and fly home",
        description:
          "A morning in Deira at the Gold Souk and Spice Souk, with an abra ride across the creek. Afternoon transfer to the airport.",
        tags: ["Gold Souk", "Abra ride", "Airport drop"],
      },
    ],
    included: [
      "Return flights from Ahmedabad with 30 kg baggage",
      "UAE tourist visa",
      "4 nights at a 4-star hotel with daily breakfast",
      "Dhow cruise dinner and desert safari dinner",
      "Burj Khalifa tickets, level 124 and 125",
      "Abu Dhabi day trip with BAPS Mandir visit",
      "All transfers in an air-conditioned coach",
      "Suman Holidays tour manager on group departures",
    ],
    excluded: [
      "Lunch and the remaining dinners",
      "Tourism dirham fee, payable at the hotel",
      "Travel insurance",
      "GST at 5% and TCS as per current rules",
    ],
    hotels: [
      { city: "Dubai", name: "Ramada by Wyndham Barsha Heights", category: "4 star", nights: 4 },
    ],
    faqs: [
      {
        q: "Is the UAE visa included?",
        a: "Yes. We file it about 15 days before departure. We need a passport scan, a photo on a white background and a PAN card copy for each traveller.",
      },
      {
        q: "Is Indian vegetarian food easy to find?",
        a: "Very. Breakfast at the hotel has Indian dishes, and we point the group to pure vegetarian and Jain restaurants in Bur Dubai and Karama for other meals.",
      },
      {
        q: "Can senior citizens do the desert safari?",
        a: "Yes. Dune bashing is optional; anyone who prefers can ride straight to the camp in a separate car and join the dinner and shows.",
      },
      {
        q: "How do we get from Vadodara to the flight?",
        a: "Group departures from Vadodara include a coach to Ahmedabad airport and back. It leaves from near our Fatehgunj office.",
      },
    ],
    departures: [
      { date: "2026-11-14", fromCity: "Vadodara", seatsLeft: 6, price: 46999 },
      { date: "2026-12-24", fromCity: "Ahmedabad", seatsLeft: 4, price: 52999 },
      { date: "2027-01-16", fromCity: "Vadodara", seatsLeft: 14, price: 46999 },
    ],
  },

  {
    slug: "bali-temples-and-beaches",
    title: "Bali Temples and Beaches",
    destinationSlug: "bali",
    place: "Bali, Indonesia",
    nights: 6,
    days: 7,
    priceFrom: 58999,
    rating: 4.7,
    reviewCount: 102,
    types: ["honeymoon", "family", "beach"],
    inclusions: ["Flights", "Hotels", "Breakfast", "Sightseeing"],
    heroImage: "/images/bali.jpg",
    gallery: [
      { src: "/images/bali.jpg", alt: "Balinese temple gate among green rice terraces" },
      { src: "/images/honeymoon-boat.jpg", alt: "Couple on a decorated boat" },
      { src: "/images/couple-beach.jpg", alt: "Couple walking along the beach at low tide" },
      { src: "/images/palawan.jpg", alt: "Limestone cliffs above a turquoise bay" },
      { src: "/images/family.jpg", alt: "Family at sunset" },
    ],
    stops: ["Ubud", "Kintamani", "Nusa Penida", "Seminyak", "Uluwatu"],
    facts: {
      startsAndEnds: "Denpasar",
      groupSize: "2 to 18 people",
      bestTime: "April to October",
      flights: "From Ahmedabad or Mumbai, via Singapore",
    },
    overview:
      "Three nights in Ubud among rice terraces and water temples, then three by the sea in Seminyak. You get a day on Nusa Penida for Kelingking Beach, a sunset at Tanah Lot and the Kecak fire dance at Uluwatu. A private car and driver is with you every day, so the plan bends around weather and energy.",
    highlights: [
      "Tegallalang rice terraces and Tirta Empul",
      "Fast boat to Nusa Penida and Kelingking Beach",
      "Sunset at Tanah Lot sea temple",
      "Kecak fire dance at Uluwatu",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Bali, on to Ubud",
        description:
          "Pick-up at Denpasar airport and a 90-minute drive to Ubud. Evening walk through the Ubud art market and the palace.",
        tags: ["Airport pick-up", "Ubud market"],
      },
      {
        day: 2,
        title: "Rice terraces and water temples",
        description:
          "Early light at the Tegallalang rice terraces, then the holy springs of Tirta Empul. Afternoon at the Sacred Monkey Forest in Ubud.",
        tags: ["Tegallalang", "Tirta Empul", "Monkey Forest"],
      },
      {
        day: 3,
        title: "Kintamani and coffee plantation",
        description:
          "Drive up to Kintamani for lunch facing Mount Batur and its crater lake. Stop at a coffee and spice plantation on the way back.",
        tags: ["Mount Batur view", "Coffee tasting"],
      },
      {
        day: 4,
        title: "Ubud to Seminyak via Tanah Lot",
        description:
          "Check out after breakfast and drive to the coast. Watch the sun go down behind Tanah Lot temple before checking in at Seminyak.",
        tags: ["Tanah Lot sunset", "Beach hotel"],
      },
      {
        day: 5,
        title: "Nusa Penida island day",
        description:
          "Fast boat from Sanur to Nusa Penida for Kelingking Beach, Broken Beach and Angel's Billabong, with lunch on the island.",
        tags: ["Fast boat", "Kelingking Beach", "Lunch"],
      },
      {
        day: 6,
        title: "Uluwatu and the Kecak dance",
        description:
          "A free morning on the beach. In the afternoon, drive to the clifftop Uluwatu temple for the Kecak fire dance at sunset, then dinner at Jimbaran Bay.",
        tags: ["Uluwatu temple", "Kecak dance"],
      },
      {
        day: 7,
        title: "Fly home",
        description: "Transfer to Denpasar airport for your flight home via Singapore.",
        tags: ["Airport drop"],
      },
    ],
    included: [
      "Return flights from Ahmedabad via Singapore",
      "6 nights in 4-star hotels with daily breakfast",
      "Private car with an English-speaking driver every day",
      "Nusa Penida fast boat and island tour with lunch",
      "Entry tickets for all temples listed",
      "Kecak dance tickets",
    ],
    excluded: [
      "Indonesia visa on arrival, paid at Bali airport",
      "Bali tourist levy, paid online before arrival",
      "Lunch and dinner except on day 5",
      "Travel insurance",
      "GST at 5% and TCS as per current rules",
    ],
    hotels: [
      { city: "Ubud", name: "Ubud Village Hotel", category: "4 star", nights: 3 },
      { city: "Seminyak", name: "The Haven Bali Seminyak", category: "4 star", nights: 3 },
    ],
    faqs: [
      {
        q: "Is December a good time to go?",
        a: "It is the wet season, but rain usually comes as a short afternoon shower. We plan outdoor sightseeing for the mornings and keep Nusa Penida flexible for the clearest day.",
      },
      {
        q: "How does the visa on arrival work?",
        a: "Indian passport holders can get a visa on arrival at Denpasar or apply for the e-VoA online before travel. We help you with the online form so you skip the airport queue.",
      },
      {
        q: "Is the Nusa Penida boat safe for children?",
        a: "The crossing takes about 45 minutes and can be bumpy. Children over five generally manage well; for younger ones we suggest a beach day in Seminyak instead.",
      },
      {
        q: "Can we find vegetarian food?",
        a: "Yes. Ubud and Seminyak have plenty of vegetarian cafés and a few Indian restaurants. Your driver knows where they are.",
      },
    ],
    departures: [
      { date: "2026-12-05", fromCity: "Ahmedabad", seatsLeft: 11, price: 58999 },
      { date: "2027-01-09", fromCity: "Mumbai", seatsLeft: 7, price: 58999 },
    ],
  },

  {
    slug: "palawan-island-hopping",
    title: "Palawan Island Hopping",
    destinationSlug: "palawan",
    place: "Palawan, Philippines",
    nights: 6,
    days: 7,
    priceFrom: 72999,
    rating: 4.8,
    reviewCount: 64,
    badge: "New",
    types: ["beach", "adventure", "honeymoon"],
    inclusions: ["Flights", "Hotels", "Boat tours", "Transfers"],
    heroImage: "/images/palawan.jpg",
    gallery: [
      { src: "/images/palawan.jpg", alt: "Limestone cliffs above a turquoise lagoon in El Nido" },
      { src: "/images/couple-beach.jpg", alt: "Couple walking along a white sand beach" },
      { src: "/images/group.jpg", alt: "Group of friends on an outdoor trip" },
      { src: "/images/honeymoon-boat.jpg", alt: "Couple on a wooden boat" },
      { src: "/images/maldives-couple.jpg", alt: "Couple relaxing by clear water" },
    ],
    stops: ["Puerto Princesa", "El Nido"],
    facts: {
      startsAndEnds: "Puerto Princesa and El Nido",
      groupSize: "2 to 16 people",
      bestTime: "December to May",
      flights: "From Mumbai, via Manila",
    },
    overview:
      "A week on Palawan, the Philippine island known for limestone cliffs and clear lagoons. You paddle into the Puerto Princesa Underground River, then spend four nights in El Nido with two full days of island hopping by bangka boat. It is active but never hurried, and well suited to couples and friends who like the water.",
    highlights: [
      "Puerto Princesa Underground River, a UNESCO site",
      "Kayaking the Big and Small Lagoons",
      "Island hopping El Nido Tours A and C",
      "Sunset at Las Cabanas beach",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Puerto Princesa",
        description:
          "Fly in via Manila and transfer to your hotel. Evening stroll and dinner along the Baywalk.",
        tags: ["Airport pick-up"],
      },
      {
        day: 2,
        title: "Underground River",
        description:
          "Drive to Sabang and take a paddle boat into the Underground River, an 8 km cave river under the mountains. Lunch by the beach before heading back.",
        tags: ["UNESCO site", "Paddle boat", "Lunch"],
      },
      {
        day: 3,
        title: "Drive north to El Nido",
        description:
          "A five-hour drive by private van through the countryside to El Nido. Check in and catch the sunset at Las Cabanas beach.",
        tags: ["Scenic drive", "Las Cabanas sunset"],
      },
      {
        day: 4,
        title: "El Nido Tour A",
        description:
          "A full day by bangka boat: kayak through the Big and Small Lagoons, swim at Secret Lagoon and have a beach lunch on Shimizu Island.",
        tags: ["Kayaking", "Island lunch"],
      },
      {
        day: 5,
        title: "El Nido Tour C",
        description:
          "Further out to Hidden Beach, Secret Beach, the Matinloc Shrine and Helicopter Island, with snorkelling stops along the way.",
        tags: ["Snorkelling", "Island lunch"],
      },
      {
        day: 6,
        title: "Nacpan Beach and a free afternoon",
        description:
          "Morning at Nacpan, a 4 km stretch of quiet sand north of town. The afternoon is yours: a massage, the Las Cabanas zipline or just the pool.",
        tags: ["Nacpan Beach", "Free time"],
      },
      {
        day: 7,
        title: "Fly home",
        description: "Short flight from El Nido to Manila, then on to Mumbai.",
        tags: ["Airport drop"],
      },
    ],
    included: [
      "Return flights from Mumbai via Manila, including El Nido to Manila",
      "6 nights in 4-star hotels with daily breakfast",
      "Underground River permit and boat",
      "El Nido Tours A and C with lunch on board",
      "El Nido eco-tourism fee",
      "All transfers by private air-conditioned van",
    ],
    excluded: [
      "Dinners and lunch on days 1, 3, 6 and 7",
      "Snorkel gear and kayak upgrades beyond the shared tours",
      "Travel insurance",
      "GST at 5% and TCS as per current rules",
    ],
    hotels: [
      { city: "Puerto Princesa", name: "Hue Hotels and Resorts", category: "4 star", nights: 2 },
      { city: "El Nido", name: "Seda Lio", category: "4 star", nights: 4 },
    ],
    faqs: [
      {
        q: "Do Indians need a visa for the Philippines?",
        a: "Indian passport holders can currently visit visa-free for up to 14 days for tourism. Rules change, so we confirm the latest position before you pay the balance.",
      },
      {
        q: "We are not strong swimmers. Can we still go?",
        a: "Yes. Life jackets are provided on every boat and kayak, and many lagoon stops are in shallow water. The boat crew stays with the group all day.",
      },
      {
        q: "How long is the drive to El Nido?",
        a: "About five hours with a lunch stop. We use a private van, not the shared shuttles, so you can stop when you like.",
      },
    ],
    departures: [
      { date: "2026-11-21", fromCity: "Mumbai", seatsLeft: 10, price: 72999 },
      { date: "2027-01-30", fromCity: "Mumbai", seatsLeft: 8, price: 72999 },
    ],
  },

  {
    slug: "santorini-and-athens",
    title: "Santorini and Athens",
    destinationSlug: "santorini",
    place: "Greece",
    nights: 7,
    days: 8,
    priceFrom: 149999,
    rating: 4.9,
    reviewCount: 41,
    types: ["honeymoon"],
    inclusions: ["Flights", "Hotels", "Visa", "Ferries"],
    heroImage: "/images/santorini.jpg",
    gallery: [
      { src: "/images/santorini.jpg", alt: "White houses and blue domes above the Santorini caldera" },
      { src: "/images/couple-beach.jpg", alt: "Couple walking by the sea" },
      { src: "/images/honeymoon-boat.jpg", alt: "Couple on a boat at sunset" },
      { src: "/images/italy.jpg", alt: "Colourful houses on a Mediterranean hillside" },
      { src: "/images/family.jpg", alt: "Family on holiday at sunset" },
    ],
    stops: ["Athens", "Cape Sounion", "Santorini"],
    facts: {
      startsAndEnds: "Athens and Santorini",
      groupSize: "2 to 16 people",
      bestTime: "April to October",
      flights: "From Mumbai",
    },
    overview:
      "Three nights in Athens for the Acropolis and the coast road to Cape Sounion, then a ferry across the Aegean to four nights in Santorini. You stay in Fira on the caldera rim, watch the sunset from Oia and taste wine grown in volcanic soil. We handle the Schengen visa from our office.",
    highlights: [
      "Guided visit to the Acropolis and Parthenon",
      "Sunset at the Temple of Poseidon, Cape Sounion",
      "Ferry from Piraeus across the Aegean",
      "Oia sunset and a caldera-view hotel",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Athens",
        description:
          "Pick-up at Athens airport and check in near Syntagma Square. Evening walk through the lanes of Plaka below the Acropolis.",
        tags: ["Airport pick-up", "Plaka"],
      },
      {
        day: 2,
        title: "The Acropolis",
        description:
          "A guided morning at the Acropolis and Parthenon, then the Acropolis Museum. Watch the changing of the guard at Syntagma on the way back.",
        tags: ["Guided tour", "Acropolis Museum"],
      },
      {
        day: 3,
        title: "Cape Sounion",
        description:
          "A free morning, then a drive down the Athens Riviera to the Temple of Poseidon for sunset over the sea.",
        tags: ["Temple of Poseidon", "Coastal drive"],
      },
      {
        day: 4,
        title: "Ferry to Santorini",
        description:
          "Transfer to Piraeus port for the ferry to Santorini. Check in to your hotel in Fira and have dinner overlooking the caldera.",
        tags: ["Ferry", "Caldera view"],
      },
      {
        day: 5,
        title: "Oia and the caldera",
        description:
          "Walk the clifftop path from Fira to Imerovigli, then drive to Oia for its white lanes and the island's most famous sunset.",
        tags: ["Oia sunset", "Caldera walk"],
      },
      {
        day: 6,
        title: "Akrotiri and wine tasting",
        description:
          "Visit the Bronze Age town of Akrotiri, preserved under volcanic ash, and the Red Beach. End the day with a tasting at Santo Wines.",
        tags: ["Akrotiri", "Red Beach", "Wine tasting"],
      },
      {
        day: 7,
        title: "A free day in Santorini",
        description:
          "Explore the hill village of Pyrgos, take the cable car down to the old port, or rest at the hotel.",
        tags: ["Free day"],
      },
      {
        day: 8,
        title: "Fly home",
        description: "Flight from Santorini to Athens and on to Mumbai.",
        tags: ["Airport drop"],
      },
    ],
    included: [
      "Return flights from Mumbai, plus Santorini to Athens",
      "Schengen visa fee, appointment and travel insurance",
      "7 nights in 4-star hotels with daily breakfast",
      "Piraeus to Santorini ferry",
      "Acropolis guided tour with tickets",
      "Cape Sounion, Akrotiri and Santo Wines excursions",
      "Airport and port transfers",
    ],
    excluded: [
      "Greek climate resilience fee, payable at the hotels",
      "Lunch and dinner",
      "Santorini cable car",
      "GST at 5% and TCS as per current rules",
    ],
    hotels: [
      { city: "Athens", name: "Athens Gate Hotel", category: "4 star", nights: 3 },
      { city: "Santorini", name: "El Greco Resort, Fira", category: "4 star", nights: 4 },
    ],
    faqs: [
      {
        q: "Is Santorini worth visiting in winter?",
        a: "Yes, if you like it quiet. Days are mild at around 14 to 17°C, prices are lower and the sunsets are the same. Some beach clubs and cafés close, and ferries run less often, so we fix the schedule early.",
      },
      {
        q: "How long does the Schengen visa take?",
        a: "Apply at least 45 days before travel. One visit to our office is enough to prepare the file, and we book your VFS appointment in Ahmedabad or Mumbai.",
      },
      {
        q: "Can we fly to Santorini instead of taking the ferry?",
        a: "Yes, for a supplement. The flight takes 45 minutes against five to eight hours on the ferry.",
      },
    ],
    departures: [
      { date: "2026-11-07", fromCity: "Mumbai", seatsLeft: 5, price: 149999 },
      { date: "2026-12-20", fromCity: "Mumbai", seatsLeft: 2, price: 159999 },
    ],
  },

  {
    slug: "kenya-wildlife-safari",
    title: "Kenya Wildlife Safari",
    destinationSlug: "kenya",
    place: "Masai Mara, Kenya",
    nights: 6,
    days: 7,
    priceFrom: 189999,
    rating: 4.9,
    reviewCount: 37,
    types: ["adventure", "family"],
    inclusions: ["Flights", "Lodges", "All meals", "Game drives"],
    heroImage: "/images/kenya.jpg",
    gallery: [
      { src: "/images/kenya.jpg", alt: "Elephants crossing the savannah in the Masai Mara" },
      { src: "/images/family.jpg", alt: "Family together at sunset" },
      { src: "/images/group.jpg", alt: "Group of travellers outdoors" },
      { src: "/images/hero.jpg", alt: "Mountain landscape at dawn" },
      { src: "/images/couple-beach.jpg", alt: "Couple on holiday" },
    ],
    stops: ["Nairobi", "Lake Nakuru", "Lake Naivasha", "Masai Mara"],
    facts: {
      startsAndEnds: "Nairobi",
      groupSize: "2 to 12 people",
      bestTime: "July to October, December to March",
      flights: "From Mumbai",
    },
    overview:
      "A week on safari in a 4x4 Land Cruiser with a pop-up roof and a window seat for everyone. You start with rhinos and flamingos at Lake Nakuru, take a boat among the hippos on Lake Naivasha, and spend three nights in the Masai Mara looking for lions, cheetahs and leopards. All meals are included at the lodges, with vegetarian food every day.",
    highlights: [
      "Three nights in the Masai Mara",
      "Rhinos and flamingos at Lake Nakuru",
      "Boat ride among hippos on Lake Naivasha",
      "Visit to a Maasai village",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Nairobi",
        description:
          "Direct flight from Mumbai. Your safari guide meets you at the airport for the transfer to your hotel. Evening briefing over dinner.",
        tags: ["Airport pick-up", "Dinner"],
      },
      {
        day: 2,
        title: "Lake Nakuru National Park",
        description:
          "Drive down into the Rift Valley to Lake Nakuru for an afternoon game drive. It is one of the best places in Kenya to see white and black rhino.",
        tags: ["Game drive", "Rhinos", "All meals"],
      },
      {
        day: 3,
        title: "Lake Naivasha and on to the Mara",
        description:
          "A morning boat ride on Lake Naivasha past hippos and fish eagles, then continue to the Masai Mara, arriving in time for an evening drive.",
        tags: ["Boat ride", "Evening game drive"],
      },
      {
        day: 4,
        title: "A full day in the Masai Mara",
        description:
          "Out early with a picnic lunch to follow the big cats across the plains, with a stop at the Mara River for crocodiles and hippos.",
        tags: ["Full-day game drive", "Picnic lunch"],
      },
      {
        day: 5,
        title: "Maasai village and sunset drive",
        description:
          "An optional sunrise hot air balloon ride, then a visit to a Maasai village. Afternoon game drive until sunset.",
        tags: ["Maasai village", "Game drive"],
      },
      {
        day: 6,
        title: "Back to Nairobi",
        description:
          "A last early drive in the Mara before returning to Nairobi. Dinner at a well-known Indian restaurant in Westlands.",
        tags: ["Morning game drive", "Dinner"],
      },
      {
        day: 7,
        title: "Giraffe Centre and fly home",
        description:
          "Feed Rothschild's giraffes at the Giraffe Centre in the morning, then transfer to the airport for your flight to Mumbai.",
        tags: ["Giraffe Centre", "Airport drop"],
      },
    ],
    included: [
      "Return flights from Mumbai to Nairobi",
      "Kenya eTA processing",
      "6 nights in hotels and safari lodges with all meals",
      "Game drives in a 4x4 Land Cruiser, window seat for every traveller",
      "All national park and reserve fees",
      "Lake Naivasha boat ride",
      "English-speaking driver-guide throughout",
    ],
    excluded: [
      "Hot air balloon safari, bookable as an add-on",
      "Yellow fever vaccination",
      "Tips for the driver-guide and lodge staff",
      "Travel insurance",
      "GST at 5% and TCS as per current rules",
    ],
    hotels: [
      { city: "Nairobi", name: "Sarova Stanley", category: "5 star", nights: 1 },
      { city: "Lake Nakuru", name: "Lake Nakuru Sopa Lodge", category: "Safari lodge", nights: 1 },
      { city: "Masai Mara", name: "Mara Sopa Lodge", category: "Safari lodge", nights: 3 },
      { city: "Nairobi", name: "Sarova Stanley", category: "5 star", nights: 1 },
    ],
    faqs: [
      {
        q: "Do we need a yellow fever vaccine?",
        a: "Yes. India asks for a yellow fever certificate when you return from Kenya. Take the vaccine at a government-approved centre at least 10 days before you fly; we tell you where.",
      },
      {
        q: "Will we see the wildebeest migration?",
        a: "The big river crossings happen from July to October. On our November to January departures you see the resident lions, cheetahs, elephants and plains game, with fewer vehicles around.",
      },
      {
        q: "Is the safari suitable for children?",
        a: "Yes, for children aged six and above. Game drives can be long, so we keep one afternoon free at the lodge pool.",
      },
      {
        q: "What will we eat?",
        a: "All lodges serve buffets with Indian vegetarian dishes. We send your preferences, including Jain, to each lodge in advance.",
      },
    ],
    departures: [
      { date: "2026-12-12", fromCity: "Mumbai", seatsLeft: 6, price: 189999 },
      { date: "2027-01-17", fromCity: "Mumbai", seatsLeft: 8, price: 189999 },
    ],
  },

  {
    slug: "italian-coast-and-rome",
    title: "Italian Coast and Rome",
    destinationSlug: "italy",
    place: "Italy",
    nights: 8,
    days: 9,
    priceFrom: 169999,
    rating: 4.8,
    reviewCount: 52,
    types: ["honeymoon", "family"],
    inclusions: ["Flights", "Hotels", "Visa", "Rail passes"],
    heroImage: "/images/italy.jpg",
    gallery: [
      { src: "/images/italy.jpg", alt: "Colourful houses stacked on a cliff above the sea" },
      { src: "/images/santorini.jpg", alt: "Whitewashed village above the Mediterranean" },
      { src: "/images/couple-beach.jpg", alt: "Couple walking by the sea" },
      { src: "/images/family.jpg", alt: "Family at sunset" },
      { src: "/images/honeymoon-boat.jpg", alt: "Couple on a boat" },
    ],
    stops: ["Rome", "Pompeii", "Sorrento", "Amalfi Coast", "Tropea"],
    facts: {
      startsAndEnds: "Rome and Lamezia Terme",
      groupSize: "2 to 16 people",
      bestTime: "April to June, September to October",
      flights: "From Mumbai or Ahmedabad",
    },
    overview:
      "Nine days from Rome down the coast of southern Italy by fast train. You see the Vatican and the Colosseum, walk through Pompeii, drive the Amalfi Coast and finish in Tropea, a clifftop town in Calabria. Hotels are close to the stations, so you never haul luggage far.",
    highlights: [
      "Vatican Museums and the Colosseum with skip-the-line tickets",
      "Guided walk through Pompeii",
      "Amalfi Coast drive to Positano and Ravello",
      "Two nights in Tropea, Calabria",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Rome",
        description:
          "Pick-up at Fiumicino airport and check in near Via Veneto. Evening walk to the Trevi Fountain and the Spanish Steps.",
        tags: ["Airport pick-up", "Trevi Fountain"],
      },
      {
        day: 2,
        title: "The Vatican and the Colosseum",
        description:
          "Guided morning at the Vatican Museums, the Sistine Chapel and St Peter's Basilica. In the afternoon, the Colosseum and the Roman Forum.",
        tags: ["Guided tours", "Skip-the-line tickets"],
      },
      {
        day: 3,
        title: "Rome at your own pace",
        description:
          "A free day. Take the fast train to Florence for the day, or stay for Trastevere, the Pantheon and a long gelato break.",
        tags: ["Free day"],
      },
      {
        day: 4,
        title: "Pompeii and Sorrento",
        description:
          "High-speed train to Naples and a guided walk through Pompeii, then on to Sorrento, perched above the Bay of Naples.",
        tags: ["High-speed train", "Pompeii"],
      },
      {
        day: 5,
        title: "The Amalfi Coast",
        description:
          "A private minivan follows the coast road to Positano, Amalfi and the hilltop gardens of Ravello.",
        tags: ["Positano", "Ravello"],
      },
      {
        day: 6,
        title: "Capri",
        description:
          "Ferry from Sorrento to Capri. Take the funicular up to the Piazzetta and walk to the Gardens of Augustus. Ferries depend on the sea in winter, so we keep this day flexible.",
        tags: ["Capri ferry"],
      },
      {
        day: 7,
        title: "Train to Tropea",
        description:
          "Train south into Calabria and transfer to Tropea. Sunset from the terrace below Santa Maria dell'Isola.",
        tags: ["Train journey", "Tropea"],
      },
      {
        day: 8,
        title: "Tropea and Capo Vaticano",
        description:
          "Morning at the Capo Vaticano viewpoint and its coves. Afternoon in Tropea's old town, famous for its sweet red onions.",
        tags: ["Capo Vaticano", "Old town"],
      },
      {
        day: 9,
        title: "Fly home",
        description: "Transfer to Lamezia Terme airport for your flight home via Rome.",
        tags: ["Airport drop"],
      },
    ],
    included: [
      "Return flights from Mumbai, flying home from Lamezia Terme via Rome",
      "Schengen visa fee, appointment and travel insurance",
      "8 nights in 4-star hotels with daily breakfast",
      "High-speed and regional train tickets",
      "Guided tours of the Vatican, Colosseum and Pompeii",
      "Amalfi Coast drive and Capri ferry",
      "Airport and station transfers",
    ],
    excluded: [
      "City tourist tax, payable at each hotel",
      "Lunch and dinner",
      "Capri chairlift and Blue Grotto boat",
      "GST at 5% and TCS as per current rules",
    ],
    hotels: [
      { city: "Rome", name: "Hotel Artemide", category: "4 star", nights: 3 },
      { city: "Sorrento", name: "Hotel Mediterraneo Sorrento", category: "4 star", nights: 3 },
      { city: "Tropea", name: "Hotel Tropis", category: "4 star", nights: 2 },
    ],
    faqs: [
      {
        q: "Is the Amalfi Coast open in winter?",
        a: "The towns are open, but many hotels and restaurants close from November to March and ferries run less often. That is why we base you in Sorrento and use a private minivan for the coast.",
      },
      {
        q: "Is it easy to find vegetarian food in Italy?",
        a: "Very. Pizza, pasta, risotto and antipasti all come in vegetarian versions. For Jain travellers we list Indian restaurants in Rome and carry a note in Italian explaining your diet.",
      },
      {
        q: "How much walking is there?",
        a: "Rome and Pompeii mean four to six hours on foot on cobbles. Comfortable shoes matter more than anything else you pack.",
      },
    ],
    departures: [
      { date: "2026-12-23", fromCity: "Mumbai", seatsLeft: 3, price: 179999 },
      { date: "2027-01-21", fromCity: "Ahmedabad", seatsLeft: 10, price: 169999 },
    ],
  },

  {
    slug: "everest-base-camp-trek",
    title: "Everest Base Camp Trek",
    destinationSlug: "nepal",
    place: "Khumbu, Nepal",
    nights: 13,
    days: 14,
    priceFrom: 89999,
    // Trekkers must be 14 or older, so the booking card has no Children stepper.
    adultsOnly: true,
    rating: 4.9,
    reviewCount: 58,
    badge: "Group departure",
    types: ["adventure", "group"],
    inclusions: ["Flights", "Lodges", "Meals", "Guide"],
    heroImage: "/images/hero.jpg",
    gallery: [
      { src: "/images/hero.jpg", alt: "Snow-covered Himalayan peaks at sunrise" },
      { src: "/images/group.jpg", alt: "Group of friends on a mountain trek" },
      { src: "/images/kashmir.jpg", alt: "Glacial lake surrounded by pine forest" },
      { src: "/images/family.jpg", alt: "Travellers watching the sunset" },
      { src: "/images/office-desk.jpg", alt: "Trek leader going through the kit list" },
    ],
    stops: ["Kathmandu", "Lukla", "Namche Bazaar", "Tengboche", "Everest Base Camp"],
    facts: {
      startsAndEnds: "Kathmandu",
      groupSize: "6 to 16 people",
      bestTime: "March to May, October to November",
      flights: "From Vadodara, via Delhi",
    },
    overview:
      "Fourteen days on foot through the Khumbu to the foot of Everest at 5,364 m. The route follows the Dudh Koshi valley through Sherpa villages and monasteries, with two rest days built in for acclimatisation. A licensed trek leader and porters walk with the group, and a Suman Holidays tour manager travels with you from Vadodara.",
    highlights: [
      "Everest Base Camp at 5,364 m",
      "Sunrise over Everest from Kala Patthar",
      "Tengboche Monastery",
      "Two nights in Namche Bazaar",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Kathmandu",
        description:
          "Fly from Vadodara via Delhi. Transfer to your hotel in Thamel, kit check and trek briefing in the evening.",
        tags: ["Airport pick-up", "Trek briefing"],
      },
      {
        day: 2,
        title: "Fly to Lukla, trek to Phakding",
        description:
          "An early mountain flight to Lukla at 2,860 m, then an easy three-hour walk down to Phakding along the Dudh Koshi river.",
        tags: ["Lukla flight", "3 hours walking"],
      },
      {
        day: 3,
        title: "Phakding to Namche Bazaar",
        description:
          "Cross the Hillary suspension bridge and climb steeply to Namche Bazaar at 3,440 m. If the sky is clear, this is your first view of Everest.",
        tags: ["Hillary Bridge", "6 hours walking"],
      },
      {
        day: 4,
        title: "Rest day in Namche",
        description:
          "Acclimatise with a short hike to the Everest View Hotel and the village of Khumjung, then rest in Namche.",
        tags: ["Acclimatisation"],
      },
      {
        day: 5,
        title: "Namche to Tengboche",
        description:
          "A trail high above the river with views of Ama Dablam, ending at Tengboche Monastery at 3,860 m in time for evening prayers.",
        tags: ["Tengboche Monastery", "5 hours walking"],
      },
      {
        day: 6,
        title: "Tengboche to Dingboche",
        description:
          "Descend through rhododendron forest and climb past Pangboche to Dingboche at 4,410 m.",
        tags: ["5 to 6 hours walking"],
      },
      {
        day: 7,
        title: "Rest day in Dingboche",
        description:
          "A morning hike up Nangkartshang for views of Makalu and Lhotse, then a quiet afternoon to let your body adjust.",
        tags: ["Acclimatisation"],
      },
      {
        day: 8,
        title: "Dingboche to Lobuche",
        description:
          "Climb past the climbers' memorials at Thukla to Lobuche at 4,940 m.",
        tags: ["Thukla memorials", "5 hours walking"],
      },
      {
        day: 9,
        title: "Everest Base Camp",
        description:
          "Walk to Gorak Shep, drop your bags, and continue across the Khumbu Glacier moraine to Everest Base Camp. Return to Gorak Shep for the night.",
        tags: ["Everest Base Camp", "8 hours walking"],
      },
      {
        day: 10,
        title: "Kala Patthar and down to Pheriche",
        description:
          "A pre-dawn climb up Kala Patthar at 5,545 m for sunrise on Everest, then breakfast and a long descent to Pheriche.",
        tags: ["Kala Patthar sunrise", "Descent"],
      },
      {
        day: 11,
        title: "Pheriche to Namche Bazaar",
        description:
          "Back down the valley through Tengboche to Namche Bazaar, with thicker air and a hot shower at the end.",
        tags: ["Descent", "6 hours walking"],
      },
      {
        day: 12,
        title: "Namche to Lukla",
        description:
          "The last trekking day, back to Lukla for a farewell dinner with the guides and porters.",
        tags: ["Last trekking day", "Farewell dinner"],
      },
      {
        day: 13,
        title: "Fly to Kathmandu",
        description:
          "Morning flight to Kathmandu. Afternoon darshan at Pashupatinath and a walk around the Boudhanath stupa.",
        tags: ["Pashupatinath", "Boudhanath"],
      },
      {
        day: 14,
        title: "Fly home",
        description: "Transfer to Kathmandu airport for your flight home to Vadodara via Delhi.",
        tags: ["Airport drop"],
      },
    ],
    included: [
      "Return flights from Vadodara to Kathmandu via Delhi",
      "Kathmandu to Lukla return flights",
      "2 nights in Kathmandu with breakfast",
      "11 nights in teahouse lodges on twin sharing",
      "Three vegetarian meals a day on the trek",
      "Licensed trek leader and one porter for every two trekkers",
      "Sagarmatha National Park and Khumbu entry permits",
      "Suman Holidays tour manager from Vadodara",
    ],
    excluded: [
      "Travel insurance with helicopter evacuation cover, which is required",
      "Hot showers, phone charging and Wi-Fi at teahouses",
      "Tips for guides and porters",
      "GST at 5%",
    ],
    hotels: [
      { city: "Kathmandu", name: "Hotel Shanker", category: "4 star", nights: 2 },
      { city: "Phakding and Namche Bazaar", name: "Sherpa-run teahouse lodges", category: "Teahouse", nights: 4 },
      { city: "Tengboche to Gorak Shep", name: "Teahouse lodges", category: "Teahouse", nights: 6 },
      { city: "Lukla", name: "Teahouse lodge", category: "Teahouse", nights: 1 },
    ],
    faqs: [
      {
        q: "How fit do I need to be?",
        a: "You should be able to walk five to six hours a day with a light daypack. We send a six-week training plan when you book, and the group does a practice hike near Pavagadh before departure.",
      },
      {
        q: "Do Indians need a visa or passport for Nepal?",
        a: "No visa is needed. Carry your passport or voter ID card; the Aadhaar card is not accepted for entry.",
      },
      {
        q: "What if the Lukla flight is delayed?",
        a: "Mountain weather often delays flights by a day. The itinerary has a buffer, and a shared helicopter is available at extra cost if the delay runs longer.",
      },
      {
        q: "How cold does it get in December?",
        a: "Days are clear and sunny, but nights at Lobuche and Gorak Shep drop to minus 15°C. We give you a full kit list, and down jackets and sleeping bags can be hired in Kathmandu.",
      },
      {
        q: "Is there an age limit?",
        a: "Trekkers must be 14 or older. Anyone over 60 needs a doctor's fitness certificate.",
      },
    ],
    departures: [
      { date: "2026-11-08", fromCity: "Vadodara", seatsLeft: 7, price: 89999 },
      { date: "2026-12-19", fromCity: "Vadodara", seatsLeft: 4, price: 89999 },
    ],
  },
];

const coreBySlug = new Map(coreTrips.map((trip) => [trip.slug, trip]));

/** All demo trips: the nine fully written ones, then the variants from moreTrips.ts. */
export const trips: Trip[] = [
  ...coreTrips,
  ...tripVariants.map((variant) => {
    const base = coreBySlug.get(variant.base);
    if (!base) throw new Error(`Unknown base trip "${variant.base}" for ${variant.slug}`);
    return variantOf(base, variant);
  }),
];

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug);
}

export function getTripsByDestination(destinationSlug: string): Trip[] {
  return trips.filter((trip) => trip.destinationSlug === destinationSlug);
}

export type UpcomingDeparture = Departure & { trip: Trip };

/**
 * Every departure on or after `from` (default today), across all trips, sorted by date.
 * Dates are compared as ISO strings, so `from` is reduced to YYYY-MM-DD.
 */
export function getUpcomingDepartures(
  options: { from?: Date | string; limit?: number } = {},
): UpcomingDeparture[] {
  const { from = new Date(), limit } = options;
  const fromDate = typeof from === "string" ? from : from.toISOString().slice(0, 10);

  const departures = trips
    .flatMap((trip) => trip.departures.map((departure) => ({ ...departure, trip })))
    .filter((departure) => departure.date >= fromDate)
    .sort((a, b) => a.date.localeCompare(b.date) || a.trip.title.localeCompare(b.trip.title));

  return limit === undefined ? departures : departures.slice(0, limit);
}
