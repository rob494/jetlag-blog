import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getFeaturedPosts, getAuthor } from '@/lib/posts';

export default function Home() {
  const featuredPosts = getFeaturedPosts().filter(post => post.author);
  const recentPosts = getAllPosts().filter(post => post.author).slice(0, 9);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Travel Smarter, Feel Better
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Expert advice on beating jet lag, staying healthy on the road, and making the most of your adventures.
          </p>
          <Link
            href="/blog"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Explore All Posts
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => {
            const author = getAuthor(post.author);
            return (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <article className="group cursor-pointer">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-blue-600 font-medium">Featured</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={author.image}
                      alt={author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-700">{author.name}</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => {
              const author = getAuthor(post.author);
              return (
                <Link href={`/blog/${post.slug}`} key={post.slug}>
                  <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={author.image}
                            alt={author.name}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                          <span className="text-sm text-gray-700">{author.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get weekly travel tips, jet lag hacks, and destination guides delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
