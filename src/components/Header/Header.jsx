// package imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Header.css";

// hooks
import useWindowDimension from "../../hooks/useWindowDimension";

// icons
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import { PiMagnifyingGlassBold } from "react-icons/pi";

// constants
import { BASE_API_URL } from "../../constants";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, width] = useWindowDimension();
  // state
  const [categories, setCategories] = useState([
    { label: "All", value: "all" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // function
  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    const searchString = searchParams.get("search");
    setSearchTerm(searchString ? atob(searchString) : "");
    const category = searchParams.get("category");
    setSelectedCategory(category ? atob(category) : "All");
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    searchParams.set("category", btoa(category.label));
    setSearchParams(searchParams);
  };

  const handleSearch = () => {
    searchParams.set("search", btoa(searchTerm));
    setSearchParams(searchParams);
  };

  const fetchAllCategories = async () => {
    try {
      const fetchedCategoriesResp = await axios.get(
        `${BASE_API_URL}/products/categories`
      );

      const allCategories = [];
      fetchedCategoriesResp.data.forEach((fetchedCategory) => {
        allCategories.push({
          label: fetchedCategory
            .split(" ")
            .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
            .join(" "),
          value: fetchedCategory,
        });
      });

      setCategories([{ label: "All", value: "all" }, ...allCategories]);
    } catch (error) {
      console.log("Error ->", error);
    }
  };
  return (
    <div className="header">
      <div className="container">
        <div className="upper-header">
          <div className="logo">LOGO</div>
          {width > 768 && (
            <div className="search">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search.."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="search-icon">
                <PiMagnifyingGlassBold onClick={handleSearch} />
              </div>
              <div className="category-dropdown">
                <Dropdown
                  options={categories}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
          )}
          <div className="icons">
            <div className="icon">
              <AiOutlineUser fontSize={30} />
            </div>
            <div className="icon">
              <AiOutlineShopping fontSize={30} />
            </div>
          </div>
        </div>
        {width <= 768 && (
          <div className="lower-header">
            <div className="search">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search.."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="search-icon">
                <PiMagnifyingGlassBold onClick={handleSearch} />
              </div>
              <div className="category-dropdown">
                <Dropdown
                  options={categories}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
