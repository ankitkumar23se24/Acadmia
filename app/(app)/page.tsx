import Link from 'next/link';
import Image from 'next/image';
import ImageCarousel from '@/components/ImageCarousel';

export default function Home() {

  const Testimonials = [
    {
      name: "Rajan",
      image: "/avatar.jpg",
      testimonial: "Acadmia provided me with the skills and confidence to launch my tech career. The hands-on experience was invaluable!"
    },
    {
      name: "Aman",
      image: "/avatar.jpg",
      testimonial: "The industry connections I made through Acadmia were instrumental in landing my dream job. Highly recommended!"
    },
    {
      name: "Ankit",
      image: "/avatar.jpg",
      testimonial: "The instructors at Acadmia are top-notch. They really care about student success and go the extra mile to help."
    }
  ]

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section with Carousel */}
        <ImageCarousel />

        {/* ISO Certification */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">ISO 9001:2015 Certified</h2>
            <Image
              src="/iso.jpg"
              width={500}
              height={100}
              alt="ISO Certification"
              className="mx-auto"
            />
            <p className="text-xl max-w-2xl mx-auto">
              Our commitment to quality education is recognized internationally. We maintain the highest standards in our
              teaching methodologies and course content.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Acadmia?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-6 inline-block mb-4 hover:scale-125 transition-transform">
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Industry-Relevant Curriculum</h3>
                <p className="text-gray-600">
                  Our courses are designed in collaboration with industry experts to ensure you learn the most in-demand
                  skills.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-6 inline-block mb-4 hover:scale-125 transition-transform">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">State-of-the-Art Facilities</h3>
                <p className="text-gray-600">
                  Learn in our modern labs equipped with the latest technology and tools used in the industry.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-6 inline-block mb-4 hover:scale-125 transition-transform">
                  <svg
                    className="w-12 h-12 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Faculty</h3>
                <p className="text-gray-600">
                  Learn from experienced professionals who bring real-world insights into the classroom.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-4xl font-bold text-center mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {Testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8 max-w-96 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-5">
                    <Image
                      src={testimonial.image}
                      width={50}
                      height={50}
                      alt={testimonial.name}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </div>
                  <p className="mb-4 text-gray-600 italic">
                    &quot;
                    {testimonial.testimonial}
                    &quot;
                  </p>
                </div>
              ))}
              
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
