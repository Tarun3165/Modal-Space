'use client'
import Link from "next/link";
import React from "react";

const Card = ({ cardData }) => {
  return (
    <div className="w-80 border p-2 cursor-pointer">
      <Link href={`/modal-details?id=${cardData?.id}`}>
        <div className="w-full">
          <img className="w-full" src={cardData?.avatar} />
        </div>
        <div className="pt-4 text-sm">{cardData?.description}</div>
      </Link>
    </div>
  );
};

export default Card;
