import { drizzle } from "drizzle-orm/mysql2";
import { products } from "./drizzle/schema";
import * as dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL!);

const initialProducts = [
  {
    name: "Jinko 550W Monocrystalline Solar Panel",
    brand: "Jinko",
    category: "Panels" as const,
    price: 135000,
    description: "High-efficiency Jinko Tiger Pro 550W Monocrystalline solar panel for residential and commercial use.",
    image: "/images/products/jinko-550w.webp",
    specs: "550W, Monocrystalline, Efficiency: 21.4%, Temperature coefficient: -0.41%/°C",
    inStock: 1,
  },
  {
    name: "Longi 540W Monocrystalline Solar Panel",
    brand: "Longi",
    category: "Panels" as const,
    price: 125000,
    description: "Longi Hi-MO 5 540W Monocrystalline solar panel, known for its durability and high energy yield.",
    image: "/images/products/longi-540w.png",
    specs: "540W, Monocrystalline, Efficiency: 21.0%, 25-year warranty",
    inStock: 1,
  },
  {
    name: "JA Solar 550W Monocrystalline Panel",
    brand: "JA Solar",
    category: "Panels" as const,
    price: 130000,
    description: "JA Solar 550W Mono MBB Perced Half-Cell Silver Frame solar panel.",
    image: "/images/products/ja-solar-550w.jpg",
    specs: "550W, Monocrystalline, Half-Cell, Efficiency: 21.2%",
    inStock: 1,
  },
  {
    name: "Kartel 550W Monocrystalline Panel",
    brand: "Kartel",
    category: "Panels" as const,
    price: 120000,
    description: "Kartel 550W high-performance monocrystalline solar panel.",
    image: "/images/products/kartel-550w.jpg",
    specs: "550W, Monocrystalline, Efficiency: 20.8%",
    inStock: 1,
  },
  {
    name: "Sako 5KVA 48V Hybrid Inverter",
    brand: "Sako",
    category: "Inverters" as const,
    price: 350000,
    description: "Sako 5KVA 48V Hybrid Solar Inverter with built-in 80A MPPT charge controller.",
    image: "/images/products/sako-5kva.webp",
    specs: "5KVA, 48V, 80A MPPT, Pure Sine Wave, LCD Display",
    inStock: 1,
  },
  {
    name: "SRNE 5KW 48V Hybrid Inverter",
    brand: "SRNE",
    category: "Inverters" as const,
    price: 450000,
    description: "SRNE 5KW 48V Hybrid Solar Inverter, pure sine wave with advanced MPPT technology.",
    image: "/images/products/srne-5kw.jpg",
    specs: "5KW, 48V, MPPT, Pure Sine Wave, WiFi Monitoring",
    inStock: 1,
  },
  {
    name: "Kartel 5KVA 48V Pure Sine Inverter",
    brand: "Kartel",
    category: "Inverters" as const,
    price: 320000,
    description: "Kartel 5KVA 48V Pure Sine Wave Inverter, reliable power backup solution.",
    image: "/images/products/kartel-5kva.png",
    specs: "5KVA, 48V, Pure Sine Wave, Dual Input",
    inStock: 1,
  },
  {
    name: "SMS 3KVA 24V Hybrid Inverter",
    brand: "SMS",
    category: "Inverters" as const,
    price: 250000,
    description: "SMS 3KVA 24V Hybrid Solar Inverter for small to medium installations.",
    image: "https://i.ibb.co/v4m0Y0Y/sms-3kva.jpg",
    specs: "3KVA, 24V, 60A MPPT, Pure Sine Wave",
    inStock: 1,
  },
  {
    name: "Felicity 5KWH 100AH Lithium Battery",
    brand: "Felicity",
    category: "Batteries" as const,
    price: 1250000,
    description: "Felicity Solar 48V 100AH 5KWH Lithium LiFePO4 Battery for long-lasting energy storage.",
    image: "/images/products/felicity-lithium.png",
    specs: "5KWH, 100AH, 48V, LiFePO4, 10-year warranty",
    inStock: 1,
  },
  {
    name: "Index 200AH 12V Tubular Battery",
    brand: "Index",
    category: "Batteries" as const,
    price: 385000,
    description: "Index 200AH 12V Inva Tubular Battery, deep cycle for solar applications.",
    image: "/images/products/tubular-battery.png",
    specs: "200AH, 12V, Tubular, Deep Cycle, 5-year warranty",
    inStock: 1,
  },
  {
    name: "Victron 200AH 12V Lithium Battery",
    brand: "Victron",
    category: "Batteries" as const,
    price: 1100000,
    description: "Victron LiFePO4 200AH 12V Lithium Battery with integrated BMS.",
    image: "/images/products/victron-lithium.jpeg",
    specs: "200AH, 12V, LiFePO4, Integrated BMS, 10-year warranty",
    inStock: 1,
  },
  {
    name: "4G Solar Powered CCTV Camera",
    brand: "Generic",
    category: "CCTV" as const,
    price: 85000,
    description: "4G Solar Powered Security Camera with night vision and motion detection.",
    image: "/images/products/solar-cctv.jpg",
    specs: "4G, 1080P, Night Vision, Motion Detection, Solar Powered",
    inStock: 1,
  },
  {
    name: "2MP Solar CCTV System",
    brand: "Generic",
    category: "CCTV" as const,
    price: 65000,
    description: "2MP Solar CCTV Camera with wireless connectivity and cloud storage.",
    image: "https://i.ibb.co/v4m0Y0Y/solar-cctv-2mp.jpg",
    specs: "2MP, Wireless, Cloud Storage, Solar Powered, IP67 Waterproof",
    inStock: 1,
  },
  {
    name: "Solar Charge Controller 60A MPPT",
    brand: "Generic",
    category: "Accessories" as const,
    price: 45000,
    description: "60A MPPT Solar Charge Controller for efficient battery charging.",
    image: "https://i.ibb.co/v4m0Y0Y/mppt-controller.jpg",
    specs: "60A, MPPT, 150V Input, LCD Display",
    inStock: 1,
  },
  {
    name: "Solar Cable 6mm² Red/Black (100m)",
    brand: "Generic",
    category: "Accessories" as const,
    price: 25000,
    description: "High-quality solar cable for panel connections and installations.",
    image: "https://i.ibb.co/v4m0Y0Y/solar-cable.jpg",
    specs: "6mm², 100m, UV Resistant, Fire Rated",
    inStock: 1,
  },
  {
    name: "Solar Panel Mounting Bracket Kit",
    brand: "Generic",
    category: "Accessories" as const,
    price: 15000,
    description: "Complete mounting bracket kit for solar panel installation.",
    image: "https://i.ibb.co/v4m0Y0Y/mounting-bracket.jpg",
    specs: "Aluminum, Adjustable Angle, For 4 Panels",
    inStock: 1,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding products...");
    
    // Insert new products
    await db.insert(products).values(initialProducts);
    console.log(`✓ Seeded ${initialProducts.length} products`);
    
    console.log("✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
