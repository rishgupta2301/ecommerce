// package import
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./ProductList.css";

// component
import ProductCard from "../ProductCard/ProductCard";

// constants
import { BASE_API_URL } from "../../../constants";

const ProductList = () => {
  // state
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // function
  useEffect(() => {
    const categoryQueryParam = searchParams.get("category");
    if (categoryQueryParam)
      fetchProducts(atob(categoryQueryParam).toLowerCase());
    else fetchProducts();
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [searchParams, products]);

  const filterProducts = () => {
    const searchQueryParam = searchParams.get("search");
    console.log("Search Params", atob(searchQueryParam));
    let filteredProducts = products;
    if (searchQueryParam) {
      console.log("Products -> ", products);
      filteredProducts = products.filter((product) =>
        Object.values(product).some((value) => {
          console.log("Value -> ", value);
          return value
            .toString()
            .toLowerCase()
            .includes(atob(searchQueryParam));
        })
      );
    }
    setFilteredProducts(filteredProducts);
  };

  const fetchProducts = async (category) => {
    try {
      const url = category
        ? `${BASE_API_URL}/products/category/${category}`
        : `${BASE_API_URL}/products`;
      const productsResp = await axios.get(url);
      setProducts(productsResp.data);
      filterProducts();
    } catch (error) {
      console.log("Error ->", error);
    }
  };
  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
