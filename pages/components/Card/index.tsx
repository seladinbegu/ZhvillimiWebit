import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  href: string;
}

export default function Card({ title, description, href }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
      <Link
        href={href}
        className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-center"
      >
        Read More →
      </Link>
    </div>
  );
}
