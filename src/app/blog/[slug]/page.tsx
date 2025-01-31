// app/blog/[slug]/page.tsx
'use client'
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';

const BlogPost = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) throw new Error('Not found');
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        notFound(); // If file not found, show 404
      }
    };

    fetchBlogPost();
  }, [slug]);

  return (
    <article>
      <h1 className="text-3xl font-semibold mb-4">{params.slug}</h1>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </article>
  );
};

export default BlogPost;
