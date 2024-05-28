import classNames from "classnames";

interface Props {
  className?: string;
  fill: string
}

const ArrowUp = ({ className: parentClassNames, fill }: Props) => {
  return (
    <svg
      className={classNames(parentClassNames)}
      width="11"
      height="14"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M4.1345 1.36372C4.1345 0.610747 4.74525 -5.35304e-07 5.49822 -4.69477e-07C6.25164 -4.03611e-07 6.86239 0.610747 6.86239 1.36372L6.86239 9.1753L8.51145 7.4003C9.02356 6.84988 9.88486 6.81906 10.4348 7.33117C10.9848 7.84284 11.0156 8.70414 10.504 9.25456L6.4947 13.569L6.404 13.6544C5.84521 14.1542 4.98611 14.1062 4.48633 13.5474L0.47706 9.07931C-0.0227227 8.52052 0.0252739 7.66142 0.584061 7.16164C1.14241 6.66142 2.00151 6.70941 2.50173 7.2682L4.1345 9.08812L4.1345 1.36372Z"
        fill={fill}
      />
    </svg>  
  )
}

export default ArrowUp
