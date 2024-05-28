import { ReactNode } from 'react'
import styles from './StoreItem.module.css'

interface IStoreItemContentProps {
  children: ReactNode
  onClick: () => void
}

const StoreItemContent = ({ children, onClick }: IStoreItemContentProps) => {
  const iconBg = `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 1024 1024'%3E%3Cpath fill='%23000' d='M1004.8 358.4l-96-127.936c-3.744-5.024-8.192-9.376-12.8-13.536v-152.928c0-35.328-28.672-64-64-64h-640c-35.36 0-64 28.672-64 64v152.96c-4.608 4.128-9.056 8.448-12.8 13.44l-95.968 127.968c-12.416 16.512-19.232 36.96-19.232 57.632v32c0 52.928 43.072 96 96 96v0 416c0 35.328 28.672 64 64 64h704c35.328 0 64-28.672 64-64v-416c52.928 0 96-43.072 96-96v-32c0-20.672-6.816-41.12-19.2-57.6zM832 64v128h-640v-128h640zM326.176 480h-134.048l128-224h70.048l-64 224zM423.488 256h72.512v224h-136.512l64-224zM528 256h72.512l64 224h-136.512v-224zM633.76 256h70.048l128 224h-134.048l-64-224zM64 448v-32c0-6.944 2.24-13.664 6.4-19.2l96-128c6.048-8.064 15.52-12.8 25.6-12.8h91.264l-128 224h-59.264c-17.664 0-32-14.304-32-32zM640 960h-240v-320h240v320zM864 960h-192v-320c0-17.696-14.368-32-32-32h-240c-17.664 0-32 14.304-32 32v320h-208v-416h704v416zM960 448c0 17.696-14.304 32-32 32h-59.328l-128-224h91.328c10.048 0 19.552 4.736 25.568 12.8l96 128c4.192 5.536 6.432 12.256 6.432 19.2v32z'%3E%3C/path%3E%3C/svg%3E%0A")`
  return (
    <div className={styles.storeItemContent} onClick={onClick}>
      <div className={styles.storeItemContentIcon} style={{ backgroundImage: iconBg }}></div>
      {children}
    </div>
  )
}

export { StoreItemContent }
