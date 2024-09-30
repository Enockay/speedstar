interface Testimonial {
    id: number;
    name: string;
    feedback: string;
    location: string;
  }
  
  interface TestimonialsProps {
    testimonials: Testimonial[];
  }
  
  const Testimonials = ({ testimonials }: TestimonialsProps) => {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="italic">"{testimonial.feedback}"</p>
                <p className="mt-4 font-semibold">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  