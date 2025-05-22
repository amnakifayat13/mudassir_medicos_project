"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

// Type based on updated schema with category reference
interface Medicine {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  price: number;
  image: any;
  description: string;
  stock: number;
  category?: {
    title: string;
    // slug: {
    //   current: string;
    // };
  };
}

export default function Tablets() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [category, setCategory] = useState("tablets");

  useEffect(() => {
    const fetchMedicines = async () => {
      const result = await client.fetch(
        `*[_type == "medicine" && category->name == "tablets"]{
          _id,
          name,
          price,
          image,
          description,
          stock,
          category->{name}
        }`
      );
      {category}
      setMedicines(result);
    };

    fetchMedicines();
  }, [category]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      <p className="text-center text-sm sm:text-base md:text-lg text-[#252B42]">
        Featured Medicines
      </p>

      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#80b934] font-bold mt-2">
        BESTSELLER TABLETS
      </h1>

      <p className="text-center text-sm sm:text-base md:text-lg text-[#252B42] mt-2">
        Your health, our priority
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {medicines.map((med) => (
          <div
            key={med._id}
            className="relative border rounded-xl shadow-md hover:shadow-xl transition-shadow bg-white"
          >
            <div className="relative w-full h-60 rounded-t-xl overflow-hidden">
              <Image
                src={med.image ? urlFor(med.image).url() : "/fallback-image.png"}
                alt={med.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            </div>

            <div className="p-4 text-center">
              <Link href={`/medicines/${med._id}`}>
                <p className="text-[#252B42] font-semibold text-base sm:text-lg hover:underline">
                  {med.name}
                </p>
              </Link>

              <p className="text-gray-500 text-sm mt-1">Rs. {med.price}</p>

              <p className="text-gray-600 text-sm mt-1">
                Available Stock: <span className="font-medium">{med.stock}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
