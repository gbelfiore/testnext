import 'leaflet/dist/leaflet.css'

import React, { CSSProperties, memo, useMemo } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'

import { useSchemaStore } from '~/state/schema'
import { ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'
import useTemplate from '~/hooks/use-template'

const wrapperStyle: CSSProperties = {
  height: 157,
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 17,
  position: 'relative',
}

const LocationComponent: React.FC<ICollapsibleSectionContentDataOpt['location']> = () => {
  const { schema } = useSchemaStore((state) => state)
  const template = useTemplate()
  const retailer = schema?.retailer
  const nearestStore = schema?.nearestStore

  const addressFirstRow = useMemo(() => [retailer?.name, retailer?.address].filter(Boolean).join(' '), [retailer?.address, retailer?.name])

  const addressSecondRow = useMemo(() => [retailer?.street, retailer?.civic].filter(Boolean).join(' '), [retailer?.street, retailer?.civic])

  const addressThirdRow = useMemo(() => [retailer?.postalCode, retailer?.city].filter(Boolean).join(' '), [retailer?.postalCode, retailer?.city])

  const markerIcon = useMemo(
    () =>
      L.icon({
        iconUrl: template?.retailerInfo?.icon ?? '',
        iconSize: [58, 58],
        iconAnchor: [29, 29],
        popupAnchor: void 0,
        shadowUrl: void 0,
        shadowSize: void 0,
        shadowAnchor: void 0,
      }),
    [template?.retailerInfo?.icon]
  )

  const position = useMemo<L.LatLngExpression>(() => [nearestStore?.lat ?? 0, nearestStore?.lon ?? 0], [nearestStore?.lat, nearestStore?.lon])

  return (
    <>
      <div style={wrapperStyle}>
        <MapContainer center={position} zoom={13} zoomControl={false} style={{ height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={markerIcon} />
        </MapContainer>
      </div>
      <div>
        <strong>{addressFirstRow}</strong>
        <br />
        {addressSecondRow}
        <br />
        {addressThirdRow}
      </div>
    </>
  )
}

export const Location = memo(LocationComponent)
