'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getTemplate } from '~/hooks/use-template'
import { getTemplateSections } from '~/hooks/use-template-sections'
import { cloneDeep } from 'lodash-es'
import { FormatApp } from '~/components/format-app'
import { ISchemaOpt } from '~/typings/schemaopt'
import { Stylesheets } from '~/components/seo/stylesheets'
import { MagnifyingGlass } from 'react-loader-spinner'

export default function BackofficePage() {
  const [backofficeData, setBackofficeData] = useState<ISchemaOpt | null>(null)

  const template = useMemo(() => {
    if (!backofficeData) return null
    return getTemplate(backofficeData)
  }, [backofficeData])

  const templateSections = useMemo(() => {
    if (!backofficeData) return null
    return getTemplateSections(backofficeData)
  }, [backofficeData])

  const onMessageReceived = useCallback((event: MessageEvent) => {
    if (event.data.type === 'schema') {
      setBackofficeData(null)
      setTimeout(() => {
        setBackofficeData(cloneDeep(event.data.payload))
      }, 150)
    }
  }, [])

  useEffect(() => {
    globalThis.addEventListener('message', onMessageReceived)
    return () => {
      globalThis.removeEventListener('message', onMessageReceived)
    }
  }, [onMessageReceived])

  return (
    <>
      {!backofficeData ? (
        <div
          className={`flex h-[100vh] w-full flex-col items-center justify-center bg-white bg-[url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBIPEhATFRUVFhYWEBISFRMSERIVFRUWGBUWGBYZHSogGRslGxYTITEhJSkrLi4wGB8zODMtNygtLisBCgoKDg0OGBAQGC0iHR8tNSstLS0tMy0rKzErLSs1Ly0tNzUrNzctLSs3Ky03Nzc3Ly0tLSsrLzc3NDcrMDcrL//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABwgBBQYEAwL/xABBEAABAwICCAIEDQQABwAAAAABAAIDBBEFIQYHEjFBUWFxE4EiMpGhFCMzQlJicoKSorHBwkNTc5MVFlRjg7LD/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECBgP/xAApEQEBAAECBQIFBQAAAAAAAAAAAQIDEQQGEiExUdEyQXGB8RNhocHh/9oADAMBAAIRAxEAPwCcUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQFglZK0WlmksVDD4jvSe64ijBzeRv7NGVyjelp56ucwwm9rcTTtY0uc4NaN7nEADzK56q09w1hsakOP8A22vkHtaLKHMcx2oq37c0hI+awZRs+y39zmtbdeV1PR1vC8sTpl187v6T3TvS6d4bIQBUtaT/AHA6Me1wAXQRTNcA5pBB3EEEHzCrRdbXANIamjftQv8ARvd8Ts439xwPUZpNT1TiuWJMd9DPv6X3/wAWGRabRnSGKthErMiMpIz6zHcjzHI8VuV6uT1NPLTyuGc2sEREYEREBERAREQEREBERAREQEREBERAREQEREH5ebKv+luNGrq5Jr+gCWwjgIwcj55nzU3aUzFlFVSN3thkLe+wbKu9l56l+TrOV+HxuWetfM7T7+WVhEXi7IREQdDoPjRpayN97MeRHMOGy45H7pIPa/NTyHKsrhcKx2CzF9PBId7oo3HuWAle2nfk4vmjh8cc8NWecu1+35e5ERejlRERAREQEREBERAREQEREBERAREQEREBERB4sbpPGppoP7kb2Du5pAVcSDuIseIO8HiCrNFQvrJ0ddT1JqGNPgzEuuBkyQ+s098yO5XnqTtu6flri8dPVy0c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')] bg-[center_40%] bg-no-repeat`}
        >
          <MagnifyingGlass
            visible={true}
            height="250"
            width="250"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efffaa"
            color="#666"
          />
          <div className="w-[200px] text-center text-xl font-bold uppercase text-[#272830]">waiting for the schema from backoffice</div>
        </div>
      ) : (
        <>
          <Stylesheets template={template} templateSections={templateSections} onlyPrelod={false} />
          <FormatApp schema={backofficeData} isBackoffice={true} />
        </>
      )}
    </>
  )
}
