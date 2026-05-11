import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const authorsDirectory = path.join(process.cwd(), 'content/authors');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  featured: boolean;
  tags: string[];
  content?: string;
}

export interface AuthorData {
  name: string;
  slug: string;
  title: string;
  bio: string;
  image: string;
  social: {
    instagram: string;
    twitter: string;
  };
}

export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        ...(data as Omit<PostData, 'slug'>),
      };
    })
    .filter((post) => post.slug && post.title && post.author && post.date);

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(): PostData[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.featured).slice(0, 3);
}

export function getPostBySlug(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...(data as Omit<PostData, 'slug' | 'content'>),
  };
}

export async function getPostContent(slug: string): Promise<string> {
  const post = getPostBySlug(slug);
  const processedContent = await remark().use(html).process(post.content || '');
  return processedContent.toString();
}

export function getAuthor(slug: string): AuthorData {
  if (!slug || slug === 'undefined') {
    // Return a default author if slug is invalid
    return {
      name: 'Jetlag Blog Team',
      slug: 'team',
      title: 'Travel Writer',
      bio: 'Expert travel advice from our team of experienced travelers.',
      image: '/images/default-avatar.jpg',
      social: {
        instagram: '@jetlagblog',
        twitter: '@jetlagblog'
      }
    };
  }
  
  const fullPath = path.join(authorsDirectory, `${slug}.json`);
  
  // Check if file exists before trying to read it
  if (!fs.existsSync(fullPath)) {
    console.warn(`Author file not found: ${fullPath}`);
    return {
      name: 'Jetlag Blog Team',
      slug: 'team',
      title: 'Travel Writer',
      bio: 'Expert travel advice from our team of experienced travelers.',
      image: '/images/default-avatar.jpg',
      social: {
        instagram: '@jetlagblog',
        twitter: '@jetlagblog'
      }
    };
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getPostsByAuthor(authorSlug: string): PostData[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.author === authorSlug);
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
