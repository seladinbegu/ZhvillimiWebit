// pages/top-tools.js
import { useEffect, useState } from "react";

export default function TopTools() {
  const [tools, setTools] = useState<string[]>([]); // ✅ specify the type here

  useEffect(() => {
    // Simulate fetching data, in real app fetch from your API here
    const fetchedTools = [
      "Scrivener",
      "Grammarly",
      "Hemingway Editor",
      "Google Docs",
      "Evernote",
      "Ulysses",
      "ProWritingAid",
      "FocusWriter",
      "Notion",
      "Freedom",
    ];
    setTools(fetchedTools);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Top 10 Tools for Writers
        </h1>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
          {tools.length === 0 ? (
            <li>Loading tools...</li>
          ) : (
            tools.map((tool, idx) => <li key={idx}>{tool}</li>)
          )}
        </ol>
        <p className="mt-8 text-center text-sm text-gray-500 italic">
          This page simulates data fetching on client side.
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {}, // no data passed, but ISR enabled anyway
    revalidate: 3600,
  };
}
