import Image from 'next/image';
import Link from 'next/link';
import { getAuthor, getPostsByAuthor } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const authorsDir = path.join(process.cwd(), 'content/authors');
  const files = fs.readdirSync(authorsDir);
  return files.map((file) => ({
    slug: file.replace('.json', ''),
  }));
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const author = getAuthor(params.slug);
  const posts = getPostsByAuthor(params.slug);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <Image
              src={author.image}
              alt={author.name}
              width={150}
              height={150}
              className="rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
              <p className="text-xl mb-4">{author.title}</p>
              <p className="text-lg opacity-90">{author.bio}</p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:underline">{author.social.instagram}</a>
                <a href="#" className="hover:underline">{author.social.twitter}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Articles by {author.name}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
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
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
