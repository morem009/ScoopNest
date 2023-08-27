import React from "react";

function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#F28B82] text-white py-8 md:py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ScoopNest</h1>
          <p className="text-lg md:text-xl">
            Discover our story, from the origins to our latest initiatives.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold mb-10 text-center">Our History</h2>
        <p className="text-xl mb-6">
          Founded in 2018, ScoopNest embarked on a journey that began in modest
          roots. From those early days, our passion for authenticity and
          dedication to craftsmanship propelled us forward. Today, we stand as a
          beacon of exquisite taste and unparalleled quality. Every batch of our
          artisanal ice creams reflects a commitment to purity, drawing from
          nature's best with the finest ingredients. Our evolution has been
          marked by countless moments of joy, shared memories, and the continued
          trust of our cherished customers, making each scoop a testament to our
          rich legacy and the promises of the flavors yet to come.
        </p>
        {/* Add more history details or timeline here */}
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-100 py-20 px-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl">
              At ScoopNest, our mission goes beyond just offering sweet treats.
              We're dedicated to delivering the finest ice creams, using pure,
              organic ingredients coupled with age-old, cherished recipes. Every
              scoop we serve is a testament to our commitment to quality and our
              deep-rooted belief in preserving the authenticity of flavors.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-xl">
              Our aspirations stretch far and wide. We envision ScoopNest as
              more than just an ice cream parlor; we aim to be recognized as the
              paramount ice cream brand across the globe. Through persistent
              innovation, unwavering quality, and a relentless drive for
              excellence, we strive to melt hearts worldwide, one scoop at a
              time.
            </p>
          </div>
        </div>
      </section>
{/* Team Section */}
<section className="py-20 px-10">
  <h2 className="text-4xl font-bold mb-10 text-center">Meet the Team</h2>
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
    {/* Repeat for each team member */}
    <div className="text-center group">
      <img
        src={require("../assets/team-1.jpg")}
        alt="John"
        className="rounded-full w-48 h-48 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
      />
      <h3 className="text-2xl font-bold mb-2">John</h3>
      <p className="text-xl">Scoop Artist</p>
    </div>
    <div className="text-center group">
      <img
        src={require("../assets/team-2.jpg")}
        alt="Sarah"
        className="rounded-full w-48 h-48 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
      />
      <h3 className="text-2xl font-bold mb-2">Sarah</h3>
      <p className="text-xl">Sundae Stylist</p>
    </div>
    <div className="text-center group">
      <img
        src={require("../assets/team-3.jpg")}
        alt="Aberforth"
        className="rounded-full w-48 h-48 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
      />
      <h3 className="text-2xl font-bold mb-2">Aberforth</h3>
      <p className="text-xl">Topping Tailor</p>
    </div>
  </div>
</section>

    </div>
  );
}

export default AboutUs;