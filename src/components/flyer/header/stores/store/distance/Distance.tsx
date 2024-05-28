import { ReactNode } from 'react'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'

interface IDistanceProps {
  children: ReactNode
}

function Distance({ children }: IDistanceProps) {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  return (
    <span className="mr-[35px] text-[14px]" style={{ color: template?.cssVars?.storeDistanceTextColor ?? '#FFF' }}>
      {children}
    </span>
  )
}

export { Distance }
