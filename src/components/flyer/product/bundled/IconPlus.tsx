interface IconPlusProps {
    size?: number;
    color?: string;
    style?: React.CSSProperties;
}

const IconPlus = ({ size, color, style }: IconPlusProps) => {
    return <svg style={style} width={size} height={size} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M46 28.0182H28.0793V46H17.9728V28.0182H0V17.8773H17.9728V0H28.0793V17.8773H46V28.0182Z"
            fill={color}
        />
    </svg>
}

export default IconPlus