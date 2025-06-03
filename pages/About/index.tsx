// pages/about.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | BlogIn</title>
      </Head>

      <div className="bg-white min-h-screen text-gray-800">
        <section className="max-w-5xl mx-auto py-20 px-6">
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">About BlogIn</h1>
          <p className="text-lg text-center mb-12 text-gray-600">
            BlogIn is a collaborative project developed by passionate computer science students,
            aiming to provide a clean, functional, and modern blogging experience.
          </p>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{member.name}</h3>
                <p className="text-sm text-gray-700 mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

const teamMembers = [
  {
    name: 'Seladin Begu',
    role: 'Team Lead & Full-Stack Developer',
    bio: 'Managed project structure and implementation of backend APIs and frontend integration.',
  },
  {
    name: 'Alban Pasoma',
    role: 'UI/UX & Frontend Developer',
    bio: 'Designed and styled the frontend using Tailwind CSS and React components.',
  },
  {
    name: 'Tefik Ujkani',
    role: 'Authentication & Routing',
    bio: 'Implemented secure login, registration, and protected routes for authenticated users.',
  },
  {
    name: 'Shqipron Musliu',
    role: 'Blog Features & Admin Panel',
    bio: 'Built blog creation, editing, and admin management tools.',
  },
  {
    name: 'Arlind Kurti',
    role: 'Documentation & Deployment',
    bio: 'Handled project documentation and deployed the website using Vercel.',
  },
];
