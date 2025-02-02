function About() {
  return (
    <div className="bg-gray-100 text-gray-900">
      <section className="relative w-full h-[400px] bg-cover bg-center bg-[url('https://source.unsplash.com/1600x900/?hostel,dormitory')] flex items-center justify-center">
        <div className="bg-black bg-opacity-60 w-full h-full absolute"></div>
        <div className="relative text-center z-10 text-white px-6">
          <h1 className="text-4xl font-bold">About Our Hostel Management System</h1>
          <p className="mt-2 text-lg">Effortless hostel management at your fingertips.</p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Our System?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Automated Processes", desc: "Manage bookings, complaints, and fees effortlessly." },
            { title: "User-Friendly", desc: "Designed with students and administrators in mind." },
            { title: "Secure & Reliable", desc: "Ensuring data privacy and 24/7 accessibility." },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Ajay Solanki", feedback: "This system has made hostel management seamless!" },
            { name: "Sneha Sharma", feedback: "Easy to use and extremely efficient. Love it!" },
          ].map((testi, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <p className="italic">{testi.feedback}</p>
              <h4 className="mt-4 font-semibold">{testi.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Get Started Today!</h2>
        <p className="mt-2 text-gray-600">Join thousands of students and hostel managers using our system.</p>
      </section>
    </div>
  );
}

export {About};
