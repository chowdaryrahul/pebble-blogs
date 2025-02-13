# Common Next.js Mistakes and Their Solutions

Here are some common mistakes that developers make while working with Next.js, along with the corrected code formats.

## 1. **Incorrect Usage of `getStaticProps`**

### Mistake:

Using `getStaticProps` inside a page component but returning data incorrectly.

~~~js
// pages/index.js
import { getStaticProps } from 'next';

export default function Home({ data }) {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <span>{data}</span>
    </div>
  );
}

// This is incorrect because getStaticProps is not called inside the page component.
~~~

### Corrected Code:

~~~js
// pages/index.js
export default function Home({ data }) {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>{data}</p>
    </div>
  );
}

export async function getStaticProps() {
  const data = 'Hello, Next.js!';
  return {
    props: { data }, // Correct way to return data
  };
}
~~~

## 2. **Using `useEffect` to Fetch Data on the Server-Side**

### Mistake:

Trying to fetch data inside `useEffect` for server-side rendering.

~~~js
// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>{data}</p>
    </div>
  );
}
~~~

### Corrected Code:

In Next.js, `getServerSideProps` should be used for data fetching on the server side instead of `useEffect`.

~~~js
// pages/index.js

export default function Home({ data }) {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>{data}</p>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('/api/data');
  const data = await res.json();

  return {
    props: { data }, // Data fetched on the server
  };
}
~~~

## 3. **Wrong Usage of `Link` Component**

### Mistake:

Using an anchor tag (`<a>`) inside Next.js's `Link` component.

~~~js
// pages/about.js

import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <Link href="/contact">
        <a>Contact</a> {/* Incorrect usage of anchor tag */}
      </Link>
    </div>
  );
}
~~~

### Corrected Code:

In Next.js, the `Link` component should wrap only the element directly, without the need for an `<a>` tag.

~~~js
// pages/about.js

import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <Link href="/contact">
        Contact {/* Correct way to use Link */}
      </Link>
    </div>
  );
}
~~~

## 4. **Missing `key` Prop in List Rendering**

### Mistake:

Rendering a list of items without providing a unique `key` prop.

~~~js
// pages/items.js

export default function Items({ items }) {
  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item) => (
          <li>{item}</li> {/* Missing key prop */}
        ))}
      </ul>
    </div>
  );
}
~~~

### Corrected Code:

Always provide a `key` prop for list items to optimize rendering.

~~~js
// pages/items.js

export default function Items({ items }) {
  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li> {/* Correct usage of key prop */}
        ))}
      </ul>
    </div>
  );
}
~~~

## 5. **Not Using `Image` Component for Optimized Images**

### Mistake:

Using a regular `<img>` tag instead of the Next.js `Image` component

~~~js
// pages/image.js

export default function ImagePage() {
  return (
    <div>
      <h1>Optimized Image</h1>
      <img src="/images/photo.jpg" alt="Photo" /> {/* Regular img tag */}
    </div>
  );
}
~~~

### Corrected Code:

Use Next.js's `Image` component for optimized images with automatic resizing and lazy loading.

~~~js
// pages/image.js
import Image from 'next/image';

export default function ImagePage() {
  return (
    <div>
      <h1>Optimized Image</h1>
      <Image src="/images/photo.jpg" alt="Photo" width={500} height={300} /> {/* Next.js Image component */}
    </div>
  );
}
~~~