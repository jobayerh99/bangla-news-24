import Link from "next/link";
const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-red-50 px-4 py-16 mt-5 rounded-2xl">
      <div className="w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg
            aria-hidden="true"
            className="h-10 w-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
          </svg>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-extrabold tracking-tight text-red-600 sm:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600 sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist, may have been moved,
          or is temporarily unavailable.
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Footer Message */}
        <p className="mt-10 text-sm text-gray-500">
          Error Code: <span className="font-semibold text-red-600">404</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
