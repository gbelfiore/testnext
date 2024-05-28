import { IProductPrice } from "~/typings/schema";

interface PriceBlockSimpleProps {
    price: IProductPrice;
    fontSize?: number;
    fontFamily?: string;
    textDecoration?: string;
    isPlain?: boolean;
}

const PriceBlockSimple = ({ price, fontSize = 30, textDecoration = 'line-through', fontFamily, isPlain = true }: PriceBlockSimpleProps) => {
    return (
        <div style={{
            fontFamily,
            fontSize,
            textDecoration,
            fontWeight: 700,
            ...(isPlain ? {} : {
                backgroundColor: 'white',
                padding: '0 12px',
                borderRadius: 20,
            })
        }}>
            {price?.discounted}
        </div>
    );
}

export default PriceBlockSimple;