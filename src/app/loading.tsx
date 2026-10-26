export default function Loading() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-red-50 px-4">
            <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm sm:p-14">
                {/* Animated Loader */}
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-red-100 border-t-red-600" />

                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-600" />
                </div>

                {/* Heading */}
                <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
                    Loading<span className="text-red-600">...</span>
                </h2>

                {/* Description */}
                <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
                    Please wait while we prepare everything for you.
                </p>

                {/* Animated Progress Bar */}
                <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-red-100">
                    <div className="h-full w-1/3 animate-pulse rounded-full bg-red-600" />
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-red-500">
                    Please wait
                </p>
            </div>

        </div>
    );
}

