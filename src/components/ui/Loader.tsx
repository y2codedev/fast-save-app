import React from 'react';
import { BiLoader } from "react-icons/bi";

const Loader = () => {
    return (
        <span className="animate-spin">
            <BiLoader size={18} />
        </span>
    );
};

export default Loader;
