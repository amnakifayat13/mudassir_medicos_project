"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Heart } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string;
    };
  };
  slug: {
    current: string;
  };
  stock: number;
  category?: {
    _ref?: string;
    name?: string;
  };
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const router = useParams() as { id: string };
  const id = router.id;

  useEffect(() => {
    

    const fetchProduct = async () => {
      const query = `*[_type == "medicine" && _id == $id][0] {_id, title, name, description, price, productImage, slug, category, stock,image}`;
      const params = { id };
      const data = await client.fetch(query, params);
      setProduct(data);

      if (data?.category?._ref) {
        const relatedQuery = `*[_type == "medicine" && category._ref == $categoryRef && _id != $id] {
          _id, title, name, productImage, price, slug, stock,image
        }`;
        const relatedData = await client.fetch(relatedQuery, {
          categoryRef: data.category._ref,
          id,
        });
        setRelatedProducts(relatedData);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="p-16 min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="p-16 min-h-auto md:w-[1170px] md:mx-auto">
      <div className="flex flex-col md:flex-row text-[#252B42] gap-10 px-4 sm:px-8 lg:px-16 py-10">
        {/* Product Image */}
        <div className="relative flex justify-center md:w-1/2 mb-10 md:mb-0">
          <Image
            src={
              product.image
                ? urlFor(product.image).url()
                : "/fallback-image.png"
            }
            alt={product.title || product.name}
            width={400}
            height={400}
            className="w-full  max-w-[350px] sm:max-w-[300px] md:max-w-[500px] h-[430px] object-cover rounded-lg shadow-lg transition-all transform hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 px-6">
          <h1 className="text-3xl font-bold mt-4 md:mt-10 text-[#252B42]">
            {product.title || product.name}
          </h1>
          <p className="mt-4 text-base text-gray-700">{product.description}</p>

          <div className="mt-6">
            <p className="text-xl font-extrabold text-[#80b934]">
              Price: ${product.price}
            </p>
            <p className="text-lg text-blue-700 mt-2">
              Available Stock: {product.stock}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-[#80b934] mt-2 font-semibold md:ml-2 text-2xl">
          Related Items
        </h2>
        <div className="ml-6 mr-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-10">
          {relatedProducts.length === 0 ? (
            <p>No related products found</p>
          ) : (
            relatedProducts.map((relatedItem) => (
              <div
                key={relatedItem._id}
                className="relative bg-white shadow-md rounded-lg overflow-hidden group"
              >
                <div className="relative w-full h-64 bg-gray-200">
                  <Image
                    src={
                      relatedItem.image
                        ? urlFor(relatedItem.image).url()
                        : "/fallback-image.png"
                    }
                    alt={ relatedItem.name}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-4 text-center">
                  <Link href={`/medicines/${relatedItem._id}`}>
                    <p className="text-[#252B42] font-semibold mt-4">
                      { relatedItem.name}
                    </p>
                  </Link>
                  <p className="text-xs mt-2 text-[#252B42]">
                    {relatedItem.description}
                  </p>
                  <p className="text-slate-400 text-sm font-semibold mt-2">
                    ${relatedItem.price}
                  </p>
                  <p className="text-slate-400 text-sm font-semibold">
                    Stock: {relatedItem.stock}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}