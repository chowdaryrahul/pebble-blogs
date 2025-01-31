// app/page.tsx
'use-client'
import Link from 'next/link';

interface BlogPreview {
  slug: string;
  title: string;
  description: string;
}

const Home = () => {
  const blogPreviews: BlogPreview[] = [
    { slug: 'numero-uno', title: 'My First Blog', description: 'This is a short description of the blog...' },
    // Add more previews here
  ];

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-6">Welcome to My Blog</h1>
      <div>
        {blogPreviews.map((blog) => (
          <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-700">{blog.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
