import CategoryCard from "@/components/products/CategoryCard";

const CategorySection = () => {
  const categories = [
    {
      title: "Elixíe Rosée Eternelle Serum",
      description: "Experience the nourishing power of botanical extracts",
      imageUrl: "/attached_assets/download-1.png",
      link: "/products/1",
    },
    {
      title: "Terra Vita Rejuvenating Mud Mask",
      description: "Detoxify and revitalize your skin with natural clay and botanicals",
      imageUrl: "/attached_assets/image_1747722005603.png",
      link: "/products/2",
    },
    {
      title: "Velaré Radiance Crème",
      description: "Luxurious moisturizer infused with healing botanical elements",
      imageUrl: "/attached_assets/screenshot-1747718970392.png",
      link: "/products/3",
    },
  ];

  return (
    <section className="py-16 bg-[#FFFDE7] bg-opacity-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-[#424242]">
            Explore Our Product Formulations
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our botanical-rich formulations crafted for exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              imageUrl={category.imageUrl}
              link={category.link}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;
