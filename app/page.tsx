import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Home Page</h1>
      <p className="mt-4 text-gray-600">Apppppp</p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/login"
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Log In
        </Link>
        <Link
          href="/register"
          className="rounded-md border border-black px-4 py-2 hover:bg-gray-100"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
