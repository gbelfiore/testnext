import type { CSSProperties, ReactNode } from "react";

interface IVirtualItemFlyerProps {
    children: ReactNode;
    addStyle: CSSProperties;
    isSticky: boolean;
    isColophon: boolean;
    height: number;
}