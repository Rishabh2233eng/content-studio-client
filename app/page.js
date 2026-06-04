import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        <div className="mb-6">
          <span className="bg-purple-500/20 text-purple-400 text-sm px-4 py-2 rounded-full border border-purple-500/30">
            AI-Powered Content Creation
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Create Content
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {" "}10x Faster
          </span>
        </h1>
        <p className="text-gray-400 text-xl mb-10 leading-relaxed">
          One topic. Five formats. Blog posts, LinkedIn, Twitter threads,
          YouTube scripts, and email newsletters — all generated instantly by AI.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all">
            Get Started Free
          </Link>
          <Link href="/login"
            className="border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all">
            Sign In
          </Link>
        </div>
        <p className="text-gray-600 text-sm mt-6">
          5 free credits • No credit card required
        </p>
      </div>
    </main>
  );
}