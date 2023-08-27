import React from 'react';

function Contact() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-[#F28B82] text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">
            Got a question? We're here to help and answer any question you might have.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold mb-10 text-center">How to Reach Us</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-6">Address</h3>
            <p className="text-xl mb-8">
            Five Gardens, Matunga East, Mumbai
            </p>
            <h3 className="text-3xl font-bold mb-6">Phone</h3>
            <p className="text-xl mb-8">
            022 287 67890
            </p>
            <h3 className="text-3xl font-bold mb-6">Email</h3>
            <p className="text-xl">
              support@scoopnest.com
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">Message Us</h3>
            <form>
              <input className="border rounded w-full py-3 px-5 mb-5 text-xl shadow-sm focus:border-[#F28B82]" type="text" placeholder="Your Name" />
              <input className="border rounded w-full py-3 px-5 mb-5 text-xl shadow-sm focus:border-[#F28B82]" type="email" placeholder="Your Email" />
              <textarea className="border rounded w-full py-3 px-5 text-xl shadow-sm focus:border-[#F28B82]" rows="4" placeholder="Your Message"></textarea>
              <button className="bg-[#F28B82] hover:bg-[#F0696A] text-white font-bold py-4 px-8 rounded text-xl mt-5 transition-all duration-300">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
