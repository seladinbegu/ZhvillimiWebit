import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    // Simulate submission
    console.log("Submitted data:", data);
    reset();
  }

  return (
    <>
      <Head>
        <title>Contact Us | BlogIn</title>
      </Head>

      <div className="bg-white min-h-screen text-gray-800 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto flex flex-col">
        <section className="max-w-3xl w-full mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-700">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-10 sm:mb-12 px-2 sm:px-0 text-sm sm:text-base">
            Have questions, feedback, or want to collaborate? Reach out to us!
          </p>

          {isSubmitSuccessful && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8 text-center text-sm sm:text-base">
              Thank you for reaching out! We will get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 transition ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="you@example.com"
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 transition ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 font-semibold text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                rows={5}
                placeholder="Write your message here..."
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 transition resize-y ${
                  errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.message && (
                <p className="text-red-600 mt-1 text-sm">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full transition text-lg sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full transition text-lg sm:text-base"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
