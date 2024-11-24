import { MutableRefObject } from "react";

export type GridProps = {
    [index: number]: string;
    children?: React.ReactNode;
    xxl?: number;
    xl?: number;
    lg?: number;
    md?: number;
    sm?: number;
    className?: string;
}