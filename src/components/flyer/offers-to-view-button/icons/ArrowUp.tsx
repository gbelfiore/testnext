import classNames from 'classnames'

interface Props {
  className?: string
  fill: string
}

const ArrowUp = ({ className: parentClassNames, fill }: Props) => {
  return (
    <svg className={classNames(parentClassNames)} width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        id="Vector"
        d="M6.8655 12.6363C6.8655 13.3893 6.25475 14 5.50178 14C4.74836 14 4.13761 13.3893 4.13761 12.6363L4.13761 4.8247L2.48855 6.5997C1.97644 7.15012 1.11514 7.18094 0.56516 6.66883C0.0151791 6.15716 -0.0156446 5.29586 0.496027 4.74544L4.5053 0.431014L4.596 0.345589C5.15479 -0.154194 6.01389 -0.106197 6.51367 0.452591L10.5229 4.92069C11.0227 5.47948 10.9747 6.33858 10.4159 6.83836C9.85759 7.33858 8.99849 7.29058 8.49827 6.7318L6.8655 4.91188L6.8655 12.6363Z"
        fill={fill}
      />
    </svg>
  )
}

export default ArrowUp
