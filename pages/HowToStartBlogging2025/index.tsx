import { GetServerSideProps, NextPage } from "next";

interface Props {
  title: string;
  content: string[];
}

const HowToStartBlogging2025: NextPage<Props> = ({ title, content }) => {
  return (
    <main className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900">
          {title}
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.map((step, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                Step {idx + 1}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const title = "How to Start Blogging in 2025";
  const content = [
    "Blogging remains one of the best ways to share your ideas, grow a community, and even build a business. In 2025, starting a blog is easier than ever with many new tools and platforms.",
    "First, choose your niche — what topics are you passionate about? Pick something specific so you can attract a dedicated audience.",
    "Next, pick a platform. Popular options include Next.js for custom static sites, WordPress for traditional blogs, or even social platforms like Medium.",
    "Focus on creating high-quality content consistently. Use SEO strategies and promote your blog on social media to grow readership.",
    "Finally, consider monetization options such as affiliate marketing, sponsored posts, or selling your own products.",
    "Start today and be ready to adapt as blogging technology and audience preferences evolve!"
  ];

  return {
    props: {
      title,
      content,
    },
  };
};

export default HowToStartBlogging2025;
