import React from "react";
import { Link } from "react-router-dom";

const AddNewButton = ({ className, label, to }) => {
  return (
    <Link
      to={to}
      className={("btn btn-sm btn-success text-white px-3 px-md-5 ") + className}
    >
        {label}
    </Link>
  );
};

export default AddNewButton;
