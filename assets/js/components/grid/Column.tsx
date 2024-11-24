import React from 'react';
import { GridProps } from "../../types/grid/grid"

const Column = ({ xxl, xl = 12, lg = 12, md = 12, sm = 12, children, className = '' }: GridProps) => {
    const sizeVariantXXl: GridProps = {
        1: '2xl:w-1/12',
        2: '2xl:w-2/12',
        3: '2xl:w-3/12',
        4: '2xl:w-4/12',
        5: '2xl:w-5/12',
        6: '2xl:w-6/12',
        7: '2xl:w-7/12',
        8: '2xl:w-8/12',
        9: '2xl:w-9/12',
        10: '2xl:w-10/12',
        11: '2xl:w-11/12',
        12: '2xl:w-full',
    }
    const sizeVariantXl: GridProps = {
        1: 'xl:w-1/12',
        2: 'xl:w-2/12',
        3: 'xl:w-3/12',
        4: 'xl:w-4/12',
        5: 'xl:w-5/12',
        6: 'xl:w-6/12',
        7: 'xl:w-7/12',
        8: 'xl:w-8/12',
        9: 'xl:w-9/12',
        10: 'xl:w-10/12',
        11: 'xl:w-11/12',
        12: 'xl:w-full',
    }
    const sizeVariantLg: GridProps = {
        1: 'lg:w-1/12',
        2: 'lg:w-2/12',
        3: 'lg:w-3/12',
        4: 'lg:w-4/12',
        5: 'lg:w-5/12',
        6: 'lg:w-6/12',
        7: 'lg:w-7/12',
        8: 'lg:w-8/12',
        9: 'lg:w-9/12',
        10: 'lg:w-10/12',
        11: 'lg:w-11/12',
        12: 'lg:w-full',
    }
    const sizeVariantMd: GridProps = {
        1: 'md:w-1/12',
        2: 'md:w-2/12',
        3: 'md:w-3/12',
        4: 'md:w-4/12',
        5: 'md:w-5/12',
        6: 'md:w-6/12',
        7: 'md:w-7/12',
        8: 'md:w-8/12',
        9: 'md:w-9/12',
        10: 'md:w-10/12',
        11: 'md:w-11/12',
        12: 'md:w-full',
    }
    const sizeVariantSm: GridProps = {
        1: 'sm:w-1/12',
        2: 'sm:w-2/12',
        3: 'sm:w-3/12',
        4: 'sm:w-4/12',
        5: 'sm:w-5/12',
        6: 'sm:w-6/12',
        7: 'sm:w-7/12',
        8: 'sm:w-8/12',
        9: 'sm:w-9/12',
        10: 'sm:w-10/12',
        11: 'sm:w-11/12',
        12: 'sm:w-full',
    }
    
    return (
        <div className={`column md:px-3 px-4 ${xxl ? sizeVariantXXl[xxl] : ''} ${sizeVariantXl[xl]} ${sizeVariantLg[lg]} ${sizeVariantMd[md]} ${sizeVariantSm[sm]} w-full ${className}`}>
            {children}
        </div>
    );
}
export default Column;