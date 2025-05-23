import { StarRating } from "@/components/ui/star-rating";

const testimonials = [
  {
    content:
      "Elixíe Rosée Eternelle Serum has completely transformed my skin. The hyaluronic acid and botanical extracts have given me a dewy glow I've never achieved before. After just 3 weeks, my fine lines appear diminished and my skin texture is noticeably smoother.",
    author: "Catherine L.",
    rating: 5,
  },
  {
    content:
      "The Velaré Radiance Crème is truly exceptional. The rosehip oil and squalane provide lasting hydration without feeling heavy. I've been using it for a month and have received countless compliments on my skin's luminosity. Worth every penny!",
    author: "James R.",
    rating: 5,
  },
  {
    content:
      "Terra Vita Rejuvenating Mud Mask has become my Sunday evening ritual. The natural clays draw out impurities while the botanical extracts calm my sensitive skin. I'm amazed at how refreshed and balanced my skin looks after each application.",
    author: "Isabella M.",
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-[#FFFDE7] bg-opacity-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-[#424242]">
            Customer Love
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            What our customers are saying about their Elixíe experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <StarRating rating={testimonial.rating} className="mb-4" />
              <p className="text-gray-600 italic mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="font-medium text-[#424242]">
                  {testimonial.author}
                </div>
                <span className="mx-2 text-gray-400">|</span>
                <div className="text-gray-500 text-sm">Verified Customer</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
