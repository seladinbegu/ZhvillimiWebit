import { Blog } from "@/api/models/Blog";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  body: string;
};

export default function CreteBlog() {
  const router = useRouter();
  const { post } = useFetch<Blog[]>("/api/blogs");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await post(data);
      router.push("/blogs"); // Redirect on success
    } catch (error) {
      alert("Gabim gjatë krijimit të blogut!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Shto nje blog te ri
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Titulli"
            {...register("title", { required: "Titulli është i detyrueshëm" })}
            className={`w-full px-4 py-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
            } text-black placeholder-gray-400`}
          />
          {errors.title && (
            <p className="text-red-500 mb-4 text-sm">{errors.title.message}</p>
          )}

          <textarea
            placeholder="Përmbajtja"
            {...register("body", { required: "Përmbajtja është e detyrueshme" })}
            className={`w-full px-4 py-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.body ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
            } text-black placeholder-gray-400`}
            rows={6}
          />
          {errors.body && (
            <p className="text-red-500 mb-4 text-sm">{errors.body.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Duke ruajtur..." : "Shto Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

CreteBlog.displayName = "Create Blog | My App";
