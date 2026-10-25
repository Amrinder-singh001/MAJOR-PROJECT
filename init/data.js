const mongoose = require("mongoose");

let sampleListing = [
  {
    title: "Cozy Mountain Cabin",
    description: "A peaceful wooden cabin surrounded by mountains and pine trees.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
    price: 4500,
    location: "Manali",
    country: "India"
  },
  {
    title: "Modern Apartment",
    description: "A stylish apartment with modern furniture and city views.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    price: 3200,
    location: "Mumbai",
    country: "India"
  },
  {
    title: "Beachside Villa",
    description: "Beautiful villa located close to the beach with a relaxing atmosphere.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    price: 7800,
    location: "Goa",
    country: "India"
  },
  {
    title: "Luxury City Loft",
    description: "A spacious loft in the heart of the city with premium interiors.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
    price: 6200,
    location: "Delhi",
    country: "India"
  },
  {
    title: "Himalayan Retreat",
    description: "Quiet retreat offering stunning Himalayan mountain views.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    price: 3900,
    location: "Shimla",
    country: "India"
  },
  {
    title: "Lake View Cottage",
    description: "Charming cottage overlooking a peaceful mountain lake.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
    price: 5100,
    location: "Nainital",
    country: "India"
  },
  {
    title: "Royal Heritage Home",
    description: "Traditional home featuring beautiful heritage architecture.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800",
    price: 5800,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Peaceful Forest House",
    description: "A comfortable house surrounded by lush green forests.",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
    price: 4200,
    location: "Rishikesh",
    country: "India"
  },
  {
    title: "Seaside Studio",
    description: "Compact studio apartment just minutes away from the sea.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    price: 3500,
    location: "Pondicherry",
    country: "India"
  },
  {
    title: "Luxury Farmhouse",
    description: "Large farmhouse with open spaces and a peaceful countryside setting.",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800",
    price: 7000,
    location: "Chandigarh",
    country: "India"
  },

  {
    title: "Mountain View Apartment",
    description: "Modern apartment offering panoramic views of the mountains.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
    price: 4700,
    location: "Dharamshala",
    country: "India"
  },
  {
    title: "Coastal Escape",
    description: "Relaxing coastal home perfect for a peaceful holiday.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    price: 6500,
    location: "Alibaug",
    country: "India"
  },
  {
    title: "Modern Villa",
    description: "Contemporary villa with spacious rooms and beautiful surroundings.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    price: 8500,
    location: "Lonavala",
    country: "India"
  },
  {
    title: "Old Town House",
    description: "Comfortable house located near the historic old town.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    price: 3600,
    location: "Amritsar",
    country: "India"
  },
  {
    title: "Green Valley Home",
    description: "Beautiful home surrounded by green valleys and fresh mountain air.",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800",
    price: 4300,
    location: "Mussoorie",
    country: "India"
  },
  {
    title: "Riverside Cottage",
    description: "Cozy cottage located beside a peaceful river.",
    image: "https://images.unsplash.com/photo-1520984032042-162d526883e0?w=800",
    price: 4800,
    location: "Rishikesh",
    country: "India"
  },
  {
    title: "Desert Retreat",
    description: "Traditional stay offering a unique desert experience.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    price: 4100,
    location: "Jaisalmer",
    country: "India"
  },
  {
    title: "Garden Villa",
    description: "Spacious villa with a beautiful private garden.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    price: 5900,
    location: "Bangalore",
    country: "India"
  },
  {
    title: "Urban Comfort Stay",
    description: "Comfortable apartment located close to major city attractions.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    price: 3300,
    location: "Pune",
    country: "India"
  },
  {
    title: "Hilltop Cottage",
    description: "A quiet cottage located on a scenic hilltop.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    price: 4600,
    location: "Kasauli",
    country: "India"
  },

  {
    title: "Parisian Apartment",
    description: "Elegant apartment with classic interiors in a charming neighborhood.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    price: 9500,
    location: "Paris",
    country: "France"
  },
  {
    title: "Santorini White House",
    description: "Beautiful whitewashed home overlooking the Aegean Sea.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    price: 12000,
    location: "Santorini",
    country: "Greece"
  },
  {
    title: "Swiss Mountain Chalet",
    description: "Traditional chalet surrounded by spectacular Alpine scenery.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    price: 11000,
    location: "Zermatt",
    country: "Switzerland"
  },
  {
    title: "Bali Tropical Villa",
    description: "Tropical villa surrounded by greenery and peaceful gardens.",
    image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800",
    price: 7200,
    location: "Bali",
    country: "Indonesia"
  },
  {
    title: "Tokyo Modern Studio",
    description: "Compact modern studio in a convenient Tokyo neighborhood.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    price: 8500,
    location: "Tokyo",
    country: "Japan"
  },
  {
    title: "New York City Loft",
    description: "Stylish loft apartment with amazing city atmosphere.",
    image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=800",
    price: 13000,
    location: "New York",
    country: "United States"
  },
  {
    title: "London Townhouse",
    description: "Classic townhouse located close to London's famous attractions.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    price: 11500,
    location: "London",
    country: "United Kingdom"
  },
  {
    title: "Dubai Luxury Apartment",
    description: "Luxury apartment with modern interiors and skyline views.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    price: 14000,
    location: "Dubai",
    country: "United Arab Emirates"
  },
  {
    title: "Amalfi Coast Villa",
    description: "Scenic villa overlooking the beautiful Mediterranean coastline.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800",
    price: 15500,
    location: "Amalfi",
    country: "Italy"
  },
  {
    title: "Icelandic Cabin",
    description: "Warm wooden cabin surrounded by dramatic Icelandic landscapes.",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
    price: 9000,
    location: "Reykjavik",
    country: "Iceland"
  },

  {
    title: "Canadian Lake House",
    description: "Peaceful lake house surrounded by forests and nature.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800",
    price: 8000,
    location: "Toronto",
    country: "Canada"
  },
  {
    title: "Australian Beach House",
    description: "Bright beach house located near the Australian coast.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    price: 10500,
    location: "Sydney",
    country: "Australia"
  },
  {
    title: "Moroccan Courtyard Home",
    description: "Traditional Moroccan home with a beautiful central courtyard.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    price: 6500,
    location: "Marrakech",
    country: "Morocco"
  },
  {
    title: "Lisbon Riverside Apartment",
    description: "Bright apartment with easy access to the river and city center.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
    price: 7000,
    location: "Lisbon",
    country: "Portugal"
  },
  {
    title: "Greek Island Retreat",
    description: "Peaceful island home with sea views and traditional architecture.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    price: 8800,
    location: "Mykonos",
    country: "Greece"
  },
  {
    title: "New Zealand Mountain Home",
    description: "Modern home surrounded by spectacular mountain scenery.",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800",
    price: 9200,
    location: "Queenstown",
    country: "New Zealand"
  },
  {
    title: "California Beach Villa",
    description: "Modern villa near the beach with spacious living areas.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
    price: 12500,
    location: "Malibu",
    country: "United States"
  },
  {
    title: "Amsterdam Canal Home",
    description: "Charming home located beside a beautiful Amsterdam canal.",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800",
    price: 9800,
    location: "Amsterdam",
    country: "Netherlands"
  },
  {
    title: "Vienna Classic Apartment",
    description: "Elegant apartment featuring classic European architecture.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800",
    price: 7600,
    location: "Vienna",
    country: "Austria"
  },
  {
    title: "Prague Old Town Stay",
    description: "Comfortable stay in the historic heart of Prague.",
    image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=800",
    price: 6900,
    location: "Prague",
    country: "Czech Republic"
  },

  {
    title: "Kerala Backwater Villa",
    description: "Relaxing villa surrounded by Kerala's famous backwaters.",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800",
    price: 5400,
    location: "Alappuzha",
    country: "India"
  },
  {
    title: "Udaipur Lake Palace Stay",
    description: "Elegant stay inspired by the royal architecture of Rajasthan.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    price: 6800,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Varanasi Riverside Home",
    description: "Traditional home close to the famous Ganges riverfront.",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800",
    price: 2800,
    location: "Varanasi",
    country: "India"
  },
  {
    title: "Sikkim Mountain Lodge",
    description: "Quiet mountain lodge offering beautiful Himalayan views.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800",
    price: 3700,
    location: "Gangtok",
    country: "India"
  },
  {
    title: "Coorg Coffee Estate",
    description: "Peaceful estate stay surrounded by coffee plantations.",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
    price: 4500,
    location: "Coorg",
    country: "India"
  },
  {
    title: "Ooty Garden Cottage",
    description: "Small cottage surrounded by beautiful gardens and hills.",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800",
    price: 3400,
    location: "Ooty",
    country: "India"
  },
  {
    title: "Munnar Tea Estate Home",
    description: "Scenic home overlooking green tea plantations.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800",
    price: 4300,
    location: "Munnar",
    country: "India"
  },
  {
    title: "Kashmir Valley Cottage",
    description: "Traditional cottage surrounded by beautiful Kashmir landscapes.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    price: 5000,
    location: "Srinagar",
    country: "India"
  },
  {
    title: "Leh Mountain Homestay",
    description: "Simple and comfortable homestay in the Himalayan region.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    price: 3000,
    location: "Leh",
    country: "India"
  },
  {
    title: "Cape Town Ocean Apartment",
    description: "Modern apartment with beautiful coastal views.",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800",
    price: 7800,
    location: "Cape Town",
    country: "South Africa"
  },
  {
    title: "Safari Lodge",
    description: "Unique lodge surrounded by natural landscapes and wildlife areas.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    price: 8900,
    location: "Nairobi",
    country: "Kenya"
  },
  {
    title: "Egyptian Desert Villa",
    description: "Traditional-style villa offering a peaceful desert experience.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800",
    price: 5700,
    location: "Cairo",
    country: "Egypt"
  },
 ];
module.exports = {data : sampleListing};