// package import
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt="Product" />
      </div>
      <div className="product-description">
        <div className="product-title">{product.title}</div>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
