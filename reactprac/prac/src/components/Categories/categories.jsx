import React, { useState } from "react";
import "./categories.css";

const Categories = ({ categories, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
  };

  return (
    <div className="categories">
      <label htmlFor="categories">Categories</label>
      <select id="category-select" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">select a category</option>
        {categories.map((category) => (<option key={category} value={category}>{category}</option>))}
      </select>
    </div>
  );
};


export default Categories;
