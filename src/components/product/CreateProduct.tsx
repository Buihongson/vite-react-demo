"use client";

import { useState } from "react";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import Drawer from "../ui/drawer";
import Product from "./Product";

const ProductsMock = [
  {
    name: "Custom T-Shirt Design",
    detail:
      "Personalized cotton t-shirt with custom printing. Available in multiple sizes and colors.",
    createdAt: "2024-03-15T10:30:00Z",
    store: "Fashion Store",
    price: 10,
  },
  {
    name: "Phone Case Creator",
    detail: "Create your own phone case design. Compatible with latest iPhone and Android models.",
    createdAt: "2024-03-14T15:45:00Z",
    store: "Tech Accessories",
    price: 10,
  },
  {
    name: "Custom Mug Design",
    detail: "High-quality ceramic mug with your custom design. Dishwasher and microwave safe.",
    createdAt: "2024-03-13T09:20:00Z",
    store: "Gift Shop",
    price: 10,
  },
];

export default function CreateProduct() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button
        size="sm"
        variant="primary"
        endIcon={<PlusIcon />}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Create Product
      </Button>

      <Drawer
        open={isOpen}
        title="Your Drawer Title"
        position="bottom"
        height="h-[80%]"
        onClose={() => setIsOpen(false)}
      >
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-[24px] w-full">
            {ProductsMock.map((item, index) => (
              <Product key={index} productInfo={item} onClose={() => setIsOpen(false)} />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
