import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const slug = 'best-jet-lag-products';
const fullPath = path.join(process.cwd(), 'content/posts', `${slug}.md`);
const fileContents = fs.readFileSync(fullPath, 'utf8');
const { data, content } = matter(fileContents);

console.log('Raw content length:', content.length);
console.log('First 200 chars:', content.substring(0, 200));

const processedContent = await remark().use(remarkHtml).process(content);
const html = processedContent.toString();

console.log('\nHTML length:', html.length);
console.log('First 300 chars of HTML:', html.substring(0, 300));
