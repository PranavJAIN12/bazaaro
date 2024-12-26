import React from "react";

const Category = ({ title }) => {
  return (
    <div className="border-2 p-6 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold capitalize">{title}</h3>
    </div>
  );
};

export default Category;
