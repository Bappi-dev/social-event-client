
import Image from "next/image";
import { MapPin } from "lucide-react";

const galleryItems = [
  {
    id: "1",
    title: "Winter Clothes Drive",
    category: "WINTER FOR RICKSHAW PULLERS",
    location: "Mirpur 10, Dhaka",
    image: "/images/winter.jpg", 
  },
  {
    id: "2",
    title: "Night Blanket Relief",
    category: "SHIT/SHELTER NIGHT SUPPORT",
    location: "Mohammadpur, Dhaka",
    image: "/images/blanket.jpg",
  },
  {
    id: "3",
    title: "Dhanmondi Lake Clean-up",
    category: "ECO PLASTIC-FREE WATERS",
    location: "Dhanmondi, Dhaka",
    image: "/images/cleanup.jpg",
  },
  {
    id: "4",
    title: "Urban Tree Plantation",
    category: "1000 GREEN SAPLINGS",
    location: "Uttara, Dhaka",
    image: "/images/tree.jpg",
  },
  {
    id: "5",
    title: "Community Food Relief",
    category: "FRESH MEALS SHARING",
    location: "Old Dhaka",
    image: "/images/food.jpg",
  },
  {
    id: "6",
    title: "Children Book & Bag Drive",
    category: "EDUCATION FOR UNDERPRIVILEGED",
    location: "Ramna/Shahbag, Dhaka",
    image: "/images/books.jpg",
  },
];

export default function GallerySection() {
  return (
    <section className="py-16  bg-slate-950 ">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold  text-white">
            Community in Action
          </h2>
          <p className="text-sm sm:text-basemax-w-xl text-gray-300 mx-auto">
            Moments from volunteer drives, relief distributions, and green initiatives across Dhaka and beyond.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-72 w-full overflow-hidden rounded-2xl bg-slate-950 shadow-md border border-slate-100 transition-all duration-300 hover:shadow-xl"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content Box */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                
                {/* Top Category Badge */}
                <div>
                  <span className="inline-block rounded-md bg-teal-600/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase border border-teal-500/30">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Title & Location */}
                <div className="space-y-1.5 text-white">
                  <h3 className="text-lg font-bold tracking-tight line-clamp-1 group-hover:text-teal-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-slate-300">
                    <MapPin className="size-3.5 text-teal-400 shrink-0" />
                    <span className="line-clamp-1">{item.location}</span>
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}