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
    <div className="mb-4">
      <label htmlFor="categories" className="font-bold mr-2">Categories</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="p-2 border border-gray-600 rounded bg-gray-700"
      >
        <option value="">select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
