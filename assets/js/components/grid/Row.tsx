import React from 'react';
import { GridProps } from "../../types/grid/grid";

const Row = ({ children, className = '' }: GridProps ) => {
    return (
        <div className={`row flex flex-wrap md:-mx-3 -mx-4 ${className}`}>
            {children}
        </div>
    );
}

export default Row;