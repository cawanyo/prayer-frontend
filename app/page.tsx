'use client'
import Link from "next/link";


export default function Home() {


  return (
    <>
    <main className="">

        <section className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Left content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900 leading-tight mb-4">
              Welcome to <br className="hidden sm:inline" /> Our Prayer Community
            </h1>
            <p className="text-gray-700 mb-6 text-base sm:text-lg">
              Join us in a supportive space where you can share your prayer requests, view community prayers,
              and receive timely notifications. Let’s lift each other up in faith and hope.
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
              <Link href="/prayer">
                <button className="bg-pink-500 text-white px-6 py-2 rounded-lg shadow hover:bg-pink-600">
                  Soumettre un sujet
                </button>
              </Link>
              <Link href="/community">
                <button className="bg-blue-100 text-blue-800 px-6 py-2 rounded-lg hover:bg-blue-200">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Right image/illustration */}
          <div className="w-full flex justify-center">
            <img
              src="/assets/images/illustration.png"
              alt="Illustration of prayer platform"
              className="max-w-xs sm:max-w-md w-full"
            />
          </div>
        </section>
    </main>
   
    </>
  );
}
