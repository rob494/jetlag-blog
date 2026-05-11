import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getAuthor } from '@/lib/posts';

export default function BlogArchive() {
  const allPosts = getAllPosts().filter(post => post.author);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">All Articles</h1>
          <p className="text-xl">Travel smarter with expert advice on jet lag, wellness, and adventure</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {allPosts.map((post) => {
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
      </div>
    </div>
  );
}
