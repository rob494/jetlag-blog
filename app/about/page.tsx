import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About TravelWell</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Helping travelers beat jet lag, stay healthy on the road, and make the most of every adventure.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2>Our Mission</h2>
          <p>
            TravelWell was created by a group of passionate travelers who were tired of losing precious days to jet lag and travel fatigue. We believe that with the right strategies, anyone can travel smarter and feel better on the road.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li><strong>Jet Lag Solutions:</strong> Science-backed strategies to adjust faster and feel better</li>
            <li><strong>Travel Wellness:</strong> How to maintain your health routines while exploring the world</li>
            <li><strong>Destination Guides:</strong> Practical advice for popular travel spots</li>
            <li><strong>Gear Reviews:</strong> Honest reviews of products that actually improve your travel experience</li>
          </ul>

          <h2>Our Team</h2>
          <p>
            Our contributors are experienced travelers, wellness experts, and digital nomads who have collectively visited over 100 countries. We test everything we recommend and only share advice that works in real-world travel situations.
          </p>

          <h2>Why Trust Us?</h2>
          <p>
            We're not travel influencers showing you picture-perfect moments. We're real travelers dealing with red-eye flights, time zone changes, and the challenge of staying healthy while constantly on the move. Our advice comes from personal experience and hundreds of trips.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg mt-12">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="mb-6">
              Get weekly travel tips, jet lag hacks, and destination guides delivered to your inbox.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
