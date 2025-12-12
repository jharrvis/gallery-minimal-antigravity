import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/gallery');

export interface GalleryItem {
  slug: string;
  title: string;
  image: string;
  date: string;
  width?: number; // Optional if we parse dimensions later
  height?: number;
}

export function getAllGalleryItems(): GalleryItem[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allItems = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      image: data.image || '',
      date: data.date ? new Date(data.date).toISOString() : '',
    };
  });

  // Sort items by date desc
  return allItems.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
