const mongoose = require('mongoose');
const Post = require('./models/Post');
require('dotenv').config();

const samplePosts = [
  {
    title: "Best Travel Destinations in 2024",
    slug: "best-travel-destinations-2024",
    content: `# Best Travel Destinations in 2024

Discover the most amazing places to visit this year! From hidden gems to popular hotspots.

## Top Picks:
- **Bali, Indonesia** - Perfect beaches and culture
- **Iceland** - Northern lights and natural wonders  
- **Japan** - Cherry blossoms and modern cities

Planning your next adventure? These destinations offer unforgettable experiences!`,
    tags: ["travel", "destinations", "2024", "adventure"],
    status: "published"
  },
  {
    title: "Budget Travel Tips for Beginners",
    slug: "budget-travel-tips-beginners",
    content: `# Budget Travel Tips for Beginners

Traveling doesn't have to break the bank! Here are proven strategies to explore the world affordably.

## Money-Saving Tips:
- Book flights in advance
- Stay in hostels or Airbnb
- Eat local street food
- Use public transportation

Start your budget travel journey today!`,
    tags: ["budget", "tips", "beginners", "money-saving"],
    status: "published"
  },
  {
    title: "Solo Travel Safety Guide",
    slug: "solo-travel-safety-guide",
    content: `# Solo Travel Safety Guide

Traveling alone can be incredibly rewarding. Here's how to stay safe while exploring solo.

## Safety Essentials:
- Research your destination
- Share your itinerary with family
- Trust your instincts
- Keep emergency contacts handy

Solo travel opens doors to self-discovery and amazing adventures!`,
    tags: ["solo-travel", "safety", "guide", "tips"],
    status: "published"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Post.deleteMany({});
    await Post.insertMany(samplePosts);
    console.log(' Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(' Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
