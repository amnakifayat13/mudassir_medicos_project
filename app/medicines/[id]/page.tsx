"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

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
      const query = `*[_type == "medicine" && _id == $id][0] {
        _id, title, name, description, price, productImage, slug, category, stock, image
      }`;
      const data = await client.fetch(query, { id });
      setProduct(data);

      if (data?.category?._ref) {
        const relatedQuery = `*[_type == "medicine" && category._ref == $categoryRef && _id != $id] {
          _id, title, name, productImage, price, slug, stock, image
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
      <div className="p-8 min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 max-w-screen-xl mx-auto">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={
              product.image
                ? urlFor(product.image).url()
                : "/fallback-image.png"
            }
            alt={product.title || product.name}
            width={400}
            height={400}
            className="w-full max-w-[90%] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#252B42] mt-4 lg:mt-0">
            {product.title || product.name}
          </h1>
          <p className="mt-3 text-base text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 space-y-2">
            <p className="text-lg sm:text-xl font-extrabold text-[#80b934]">
              Price: ${product.price}
            </p>
            <p className="text-md sm:text-lg text-blue-700">
              Available Stock: {product.stock}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-[#80b934] text-xl sm:text-2xl font-semibold mb-6">
          Related Items
        </h2>

        {relatedProducts.length === 0 ? (
          <p className="text-gray-500">No related products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedItem) => (
              <div
                key={relatedItem._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative w-full h-52 sm:h-60 md:h-64 bg-gray-100">
                  <Image
                    src={
                      relatedItem.image
                        ? urlFor(relatedItem.image).url()
                        : "/fallback-image.png"
                    }
                    alt={relatedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 text-center">
                  <Link href={`/medicines/${relatedItem._id}`}>
                    <p className="text-[#252B42] font-semibold hover:underline">
                      {relatedItem.name}
                    </p>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {relatedItem.description}
                  </p>
                  <p className="text-sm font-bold text-[#80b934] mt-2">
                    ${relatedItem.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {relatedItem.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
