import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getPostContent, getAuthor, calculateReadingTime } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts().filter(p => p && p.slug);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  const content = await getPostContent(params.slug);
  const author = getAuthor(post.author);
  const readingTime = calculateReadingTime(post.content || '');

  const relatedPosts = getAllPosts()
    .filter((p) => {
      if (!p || !p.slug || !p.author || !Array.isArray(p.tags) || !Array.isArray(post.tags)) return false;
      if (p.slug === post.slug) return false;
      return p.tags.some((tag) => post.tags.includes(tag));
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title Card */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={author.image}
                alt={author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <Link href={`/authors/${author.slug}`} className="font-semibold hover:text-blue-600">
                  {author.name}
                </Link>
                <div className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {readingTime} min read
                </div>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none mb-16
              prose-headings:font-bold prose-headings:text-black
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-black prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-a:text-blue-600 prose-a:no-underline prose-a:font-semibold hover:prose-a:underline
              prose-strong:text-black prose-strong:font-bold
              prose-ul:my-6 prose-li:my-2 prose-li:text-black
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-black"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <div className="flex gap-6">
              <Image
                src={author.image}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{author.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{author.title}</p>
                <p className="text-gray-700 mb-4">{author.bio}</p>
                <div className="flex gap-4 text-sm">
                  <a href="#" className="text-blue-600 hover:underline">{author.social.instagram}</a>
                  <a href="#" className="text-blue-600 hover:underline">{author.social.twitter}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="border-t border-b border-gray-200 py-6 mb-12">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Share this article:</span>
              <div className="flex gap-4">
                <button className="text-gray-600 hover:text-blue-600 transition">Twitter</button>
                <button className="text-gray-600 hover:text-blue-600 transition">Facebook</button>
                <button className="text-gray-600 hover:text-blue-600 transition">LinkedIn</button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.filter(p => p && p.author).map((relatedPost) => {
                const relatedAuthor = getAuthor(relatedPost.author);
                return (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                      <div className="relative h-48">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2">
                          <Image
                            src={relatedAuthor.image}
                            alt={relatedAuthor.name}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                          <span className="text-sm text-gray-700">{relatedAuthor.name}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
