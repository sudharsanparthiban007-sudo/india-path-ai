// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaPg } = require('@prisma/adapter-pg');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Pool } = require('pg');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' });
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env' });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const pois = [
  // Chennai
  {
    name: 'Kapaleeshwarar Temple',
    category: 'temple',
    city: 'Chennai',
    lat: 13.0339,
    lng: 80.2699,
    description:
      'A magnificent Dravidian-style Shiva temple in Mylapore, Chennai, believed to date back over 1,000 years. Famous for its towering gopuram covered in colourful sculptures.',
    transitInfo:
      'MTC Bus routes 5, 21, 29 stop near Mylapore. ~30 min from Chennai Central. Auto-rickshaw from Mylapore metro station: ~₹50.',
  },
  {
    name: 'Fort St. George',
    category: 'heritage',
    city: 'Chennai',
    lat: 13.0797,
    lng: 80.2878,
    description:
      'The first English fortress in India, built in 1644 by the British East India Company. Now houses the Tamil Nadu Legislative Assembly and a museum with colonial artefacts.',
    transitInfo:
      'Walk from Chennai Fort station (MRTS). Bus route 27C. Auto from Chennai Central: ~₹60, 10 min.',
  },
  {
    name: 'Chennai Central Railway Station',
    category: 'transit',
    city: 'Chennai',
    lat: 13.0827,
    lng: 80.2757,
    description:
      'The main intercity railway terminus of Chennai, one of the busiest stations in South India, connecting to Madurai, Thanjavur, and beyond.',
    transitInfo:
      'Direct trains to Madurai (6–8 hrs, ₹150–₹800), Thanjavur (5–6 hrs, ₹130–₹700). Book on IRCTC.',
  },
  // Mahabalipuram
  {
    name: 'Shore Temple, Mahabalipuram',
    category: 'heritage',
    city: 'Mahabalipuram',
    lat: 12.6166,
    lng: 80.1993,
    description:
      'A UNESCO World Heritage Site built by Pallava king Narasimhavarman II in the 8th century CE. One of the oldest structural temples in South India, standing on the shores of the Bay of Bengal.',
    transitInfo:
      'TNSTC bus from Chennai Koyambedu: 2 hrs, ₹80. Share autos from Mahabalipuram bus stand: ₹20.',
  },
  {
    name: "Arjuna's Penance",
    category: 'heritage',
    city: 'Mahabalipuram',
    lat: 12.6172,
    lng: 80.1942,
    description:
      "The world's largest bas-relief carved out of two massive boulders, depicting scenes from the Mahabharata. A UNESCO World Heritage monument of extraordinary detail.",
    transitInfo:
      'Located in Mahabalipuram town centre. 5-min walk from the bus stand. Entrance is free.',
  },
  {
    name: 'Pancha Rathas',
    category: 'heritage',
    city: 'Mahabalipuram',
    lat: 12.6096,
    lng: 80.1962,
    description:
      'Five monolithic rock-cut temples carved from single granite boulders in the 7th century. Each ratha (chariot temple) is named after a Pandava hero from the Mahabharata.',
    transitInfo:
      'Share auto from Mahabalipuram town: ₹15. 2 km south of the main beach. ASI site entrance: ₹40 (Indian), ₹600 (Foreign).',
  },
  // Madurai
  {
    name: 'Meenakshi Amman Temple',
    category: 'temple',
    city: 'Madurai',
    lat: 9.9195,
    lng: 78.1193,
    description:
      "One of India's most iconic temples, dedicated to the goddess Meenakshi and Lord Sundareswarar. The complex has 14 gopurams covered in thousands of sculpted figures, with the tallest reaching 52 metres.",
    transitInfo:
      'Madurai Railway Station to temple: auto ₹60, 15 min. City bus routes 11, 2, 44 stop nearby.',
  },
  {
    name: 'Thirumalai Nayakkar Mahal',
    category: 'heritage',
    city: 'Madurai',
    lat: 9.9178,
    lng: 78.1262,
    description:
      'A 17th-century Indo-Saracenic palace built by King Thirumalai Nayak. The enormous courtyard, ornate pillars, and sound-and-light show make it a must-visit.',
    transitInfo:
      'Auto from Meenakshi Temple: ₹40, 5 min. Open 9 AM–1 PM, 2–5 PM. Entry: ₹30 (Indian).',
  },
  {
    name: 'Madurai Junction Railway Station',
    category: 'transit',
    city: 'Madurai',
    lat: 9.9242,
    lng: 78.1189,
    description:
      'The main railway hub of Madurai, well-connected to Chennai, Coimbatore, and Kanyakumari.',
    transitInfo:
      'Express trains to Chennai: 7 hrs, ₹180–₹900. To Kanyakumari: 4 hrs, ₹120–₹600. To Thanjavur: 3 hrs, ₹90–₹500.',
  },
  // Thanjavur
  {
    name: 'Brihadeeswara Temple (Big Temple)',
    category: 'temple',
    city: 'Thanjavur',
    lat: 10.7828,
    lng: 79.1318,
    description:
      'A UNESCO World Heritage Site and crowning achievement of Chola architecture, built by Emperor Raja Raja Chola I around 1010 CE. The 66-metre vimana tower is one of the tallest in India.',
    transitInfo:
      'Thanjavur Bus Stand: 2 km. City bus or auto: ₹30–50. Free entry. Open 6 AM–12:30 PM, 4–8:30 PM.',
  },
  {
    name: 'Thanjavur Royal Palace & Art Gallery',
    category: 'heritage',
    city: 'Thanjavur',
    lat: 10.7879,
    lng: 79.1387,
    description:
      "The sprawling palace of the Thanjavur Marathas, featuring the Saraswathi Mahal Library (one of Asia's oldest libraries) and a bronze art gallery with superb Chola bronzes.",
    transitInfo:
      'Auto from Big Temple: ₹40, 5 min. Entry: ₹30 (Indian). Gallery open 9 AM–6 PM.',
  },
  {
    name: 'Schwartz Church',
    category: 'heritage',
    city: 'Thanjavur',
    lat: 10.7849,
    lng: 79.1379,
    description:
      'Built in 1779 by the Danish missionary Father Schwartz, this historic church is one of the oldest Protestant churches in Tamil Nadu and stands within the palace grounds.',
    transitInfo:
      'Walk from Thanjavur Palace (50 m). Free entry. Best visited as part of the palace complex tour.',
  },
  // Kanyakumari
  {
    name: 'Vivekananda Rock Memorial',
    category: 'heritage',
    city: 'Kanyakumari',
    lat: 8.0763,
    lng: 77.5539,
    description:
      'Built in 1970 on a small island where Swami Vivekananda reportedly meditated in 1892. Accessible by ferry from the mainland. A spiritual and architecturally distinctive landmark.',
    transitInfo:
      'Ferry from Kanyakumari jetty: ₹43 return. 15-min ride. Ferry runs 7 AM–4 PM. Kanyakumari station to jetty: 1 km walk or auto ₹30.',
  },
  {
    name: 'Kanyakumari Beach & Sunrise Point',
    category: 'beach',
    city: 'Kanyakumari',
    lat: 8.0776,
    lng: 77.5528,
    description:
      'The southernmost tip of mainland India, where the Arabian Sea, Bay of Bengal, and Indian Ocean meet. Renowned for spectacular sunrises and sunsets visible from the same spot.',
    transitInfo:
      'Kanyakumari Railway Station is 1.5 km from the beach. Auto: ₹50. Buses from Chennai: ~16 hrs overnight, ₹700–₹1,200.',
  },
  {
    name: 'Padmanabhapuram Palace',
    category: 'heritage',
    city: 'Kanyakumari',
    lat: 8.2583,
    lng: 77.3309,
    description:
      'A remarkable 16th-century wooden palace, the finest example of Kerala-style palace architecture, featuring intricate carvings, murals, and Chinese tiles, located 35 km north of Kanyakumari.',
    transitInfo:
      'TNSTC or Kerala SRTC bus from Kanyakumari: 1 hr, ₹30. Taxi: ₹400–₹600. Entry: ₹20 (Indian). Closed Mondays.',
  },
];

const culturalEvents = [
  {
    name: 'Pongal & Jallikattu Festival',
    category: 'festival',
    city: 'Madurai',
    month: 'January',
    season: 'Harvest / Winter (Mid-January)',
    description:
      'The multi-day Tamil harvest festival celebrating the Sun god with traditional sweet pongal preparation, cattle worship (Mattu Pongal), and the legendary ancient bull-embracing sport of Jallikattu in Alanganallur and Palamedu near Madurai.',
    highlight: 'Experience authentic rural Tamil harvest traditions, kolam designs, and the thrilling spectator sport of Jallikattu.',
  },
  {
    name: 'Mamallapuram Dance Festival',
    category: 'dance',
    city: 'Mahabalipuram',
    month: 'January',
    season: 'Winter (January–February)',
    description:
      'A month-long open-air classical dance festival set against the dramatic backdrop of the 8th-century UNESCO Shore Temple and Arjuna’s Penance bas-relief, bringing together master exponents of Bharatanatyam, Kathakali, Kuchipudi, and Mohiniyattam.',
    highlight: 'Open-air classical performances beneath the illuminated Pallava rock sculptures right next to the Bay of Bengal.',
  },
  {
    name: 'Thiruvaiyaru Thyagaraja Aradhana',
    category: 'music',
    city: 'Thanjavur',
    month: 'January',
    season: 'Winter (Pushya Bahula Panchami)',
    description:
      'A world-renowned 5-day Carnatic music festival honoring saint-composer Thyagaraja on the banks of the sacred Cauvery river in Thiruvaiyaru, 13 km from Thanjavur. Hundreds of musicians perform the mass choral rendition of the Pancharatna Kritis.',
    highlight: 'Witness the goosebump-inducing synchronous rendition of the five gem compositions by hundreds of vocalists and violinists.',
  },
  {
    name: 'Natyanjali Dance Festival',
    category: 'dance',
    city: 'Chidambaram',
    month: 'February',
    season: 'Maha Shivaratri (February–March)',
    description:
      'Dedicated to Lord Nataraja—the Lord of Dance—at the ancient Thillai Nataraja Temple. Dancers from across India gather to offer their art as a devotional prayer within the thousand-pillar hall and temple courtyards.',
    highlight: 'Over 300 classical dancers perform in front of the gold-roofed sanctum of the cosmic dancer.',
  },
  {
    name: 'Panguni Uthiram & Kavadi Festival',
    category: 'temple',
    city: 'Palani',
    month: 'March',
    season: 'Spring (March–April)',
    description:
      'Celebrated on the full moon of the Tamil month Panguni, honoring the celestial wedding of deities and Lord Murugan. Millions of devotees undertake padayatra (barefoot pilgrimage) carrying colorful Kavadi structures.',
    highlight: 'Spectacular devotion, traditional folk percussion, and temple chariot processions.',
  },
  {
    name: 'Chithirai Festival (Meenakshi Thirukalyanam)',
    category: 'festival',
    city: 'Madurai',
    month: 'April',
    season: 'Chithirai / Spring (April–May)',
    description:
      'Madurai’s grandest 10-day celebration reenacting the celestial coronation and wedding of Goddess Meenakshi to Lord Sundareswarar, followed by Lord Kallazhagar’s grand procession into the holy Vaigai River witnessed by over a million pilgrims.',
    highlight: 'The entire city turns into a carnival with grand temple chariots, gold palanquins, and historic pageantry.',
  },
  {
    name: 'Aadi Perukku (Cauvery River Festival)',
    category: 'festival',
    city: 'Thanjavur',
    month: 'August',
    season: 'Monsoon / Aadi (Early August)',
    description:
      'An ancient water festival expressing deep gratitude to Mother Cauvery as monsoon waters fill the river and canal networks, bringing life and fertility to the delta farmlands of Tamil Nadu.',
    highlight: 'Riverside poojas, floating oil lamps, traditional multi-variety rice picnics along the riverbanks.',
  },
  {
    name: 'Velankanni Feast of Our Lady of Good Health',
    category: 'festival',
    city: 'Velankanni',
    month: 'September',
    season: 'Monsoon (August 29 – September 8)',
    description:
      'An annual 10-day global pilgrimage feast celebrated at the Basilica of Our Lady of Good Health, often called the "Lourdes of the East". Attracts millions of pilgrims of all religious faiths who walk hundreds of miles.',
    highlight: 'Illuminated evening chariot processions carrying the statue of Our Lady and mass multi-lingual services.',
  },
  {
    name: 'Karthigai Deepam',
    category: 'temple',
    city: 'Tiruvannamalai',
    month: 'November',
    season: 'Karthigai / Late Autumn (November–December)',
    description:
      'The ancient Festival of Lights at the holy Arunachaleswarar Shiva temple. At dusk, a giant cauldron of ghee is ignited atop the sacred 2,668-foot Annamalai Hill, creating the blazing Maha Deepam visible for over 30 kilometers.',
    highlight: 'Girivalam—hundreds of thousands of barefoot pilgrims circumambulating the sacred hill lit by millions of earthen oil lamps.',
  },
  {
    name: 'Margazhi Music & Dance Season',
    category: 'music',
    city: 'Chennai',
    month: 'December',
    season: 'Margazhi / Winter (Mid-December to Mid-January)',
    description:
      'One of the largest cultural festivals in the world, the Chennai December Season hosts over 2,000 live Carnatic music concerts, Bharatanatyam recitals, and academic music conferences across more than 50 sabhas (cultural halls) in Mylapore and T. Nagar.',
    highlight: 'Morning temple lectures, afternoon concerts, famous sabha canteens serving traditional ghee roasts and filter coffee.',
  },
];

async function main() {
  console.log('Seeding database with Tamil Nadu POIs…');
  await prisma.pointOfInterest.deleteMany();
  for (const poi of pois) {
    await prisma.pointOfInterest.create({ data: poi });
  }
  console.log(`✅ Seeded ${pois.length} points of interest.`);

  console.log('Seeding database with Tamil Nadu Cultural Events…');
  if (prisma.culturalEvent) {
    await prisma.culturalEvent.deleteMany();
    for (const evt of culturalEvents) {
      await prisma.culturalEvent.create({ data: evt });
    }
    console.log(`✅ Seeded ${culturalEvents.length} cultural events.`);
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

