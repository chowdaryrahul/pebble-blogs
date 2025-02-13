// app/blog/[slug]/page.tsx
'use client'
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';
import remarkGfm from 'remark-gfm'; // GitHub Flavored Markdown support
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
        console.error(error)
        notFound(); // If file not found, show 404
      }
    };

    fetchBlogPost();
  }, [slug]);

  return (
    <article className="prose lg:prose-xl mx-auto font-serif">
      {/* <h1 className="font-serif">Title Here (Can Extract From Markdown)</h1> */}
      {/*
      *If className is undefined or empty → it's inline code.
      *If className contains "language-" → it's a block of code.
      */}
      {/* Render Markdown content using ReactMarkdown */}
      <ReactMarkdown
        children={markdownContent}
        remarkPlugins={[remarkGfm]}
        components={{
          p({ node, children }: any) {
            // Check if the paragraph directly contains a `code` block
            if (node.children.length === 1 && node.children[0].tagName === "code") {
              return <>{children}</>;
            }
            return <p>{children}</p>;
          },
          code: ({ className, children }: any) => {
            const language = className?.replace('language-', '') || '';

            if (!language) {
              // Render inline code
              return <code className="bg-gray-200 px-1 py-0.5 rounded">{children}</code>;
            }

            return (
              <SyntaxHighlighter style={oneDark} language={language} PreTag="div" className="relative group p-4 bg-gray-900 text-white max-w-full" customStyle={{
                overflowY: 'auto', // Only allow vertical scroll if needed
              }} >
                {String(children).trim()}
              </SyntaxHighlighter>
            );
          },
        }}
      />
    </article>
  );
};

export default BlogPost;
