import React from 'react';
import { GridProps } from "../../types/grid/grid";

const Container = ({ className = '', children }: GridProps) => {
    return (
        <div className={`md:px-3 px-4 md:max-w-[90%] lg:max-w-[1184px] 2xl:max-w-[1624px] max-w-full w-full mx-auto ${className}`}>
            {children}
        </div>
    )
}

export default Container;