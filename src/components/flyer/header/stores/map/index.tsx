'use client'

import 'leaflet/dist/leaflet.css'

import L, { type LatLngTuple } from 'leaflet'
import { useCallback, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { type IMapProps } from './typings'
import MarkerClusterGroup from 'react-leaflet-cluster'

const Map: React.FC<IMapProps> = ({ height, markers, userMarker, onClickMarker: onClickMarkerProps, centerMap }) => {
  const bounds = useMemo((): LatLngTuple[] => {
    const bounds = markers?.map((marker) => {
      return [marker.position.lat, marker.position.lon] as LatLngTuple
    })
    bounds?.push([userMarker.position.lat, userMarker.position.lon])
    return bounds
  }, [markers, userMarker?.position?.lat, userMarker?.position?.lon])

  const userPoi = useMemo(() => {
    const icon = L.icon({
      iconUrl: userMarker?.icon,
      iconRetinaUrl: userMarker?.icon,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    })
    return (
      <Marker
        key={`marker_${userMarker.position.lat}_${userMarker.position.lon}`}
        position={[userMarker.position.lat, userMarker.position.lon]}
        icon={icon}
      >
        <Popup>{userMarker.textPopup}</Popup>
      </Marker>
    )
  }, [userMarker])

  const onClickMarker = useCallback(
    (storeIdx?: number) => {
      if (storeIdx !== undefined) {
        onClickMarkerProps(storeIdx)
      }
    },
    [onClickMarkerProps]
  )

  const storePoi = () => {
    return markers?.map((marker) => {
      const icon = L.icon({
        iconUrl: marker.icon,
        iconRetinaUrl: marker.icon,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      })
      return (
        <Marker
          key={`marker_${marker.position.lat}_${marker.position.lon}`}
          position={[marker.position.lat, marker.position.lon]}
          icon={icon}
          eventHandlers={{
            click: (e) => {
              onClickMarker(marker.storeIdx)
            },
          }}
        >
          <Popup>{marker.textPopup}</Popup>
        </Marker>
      )
    })
  }
  return (
    <MapContainer
      bounds={centerMap ? undefined : bounds}
      center={centerMap}
      zoom={centerMap ? 15 : undefined}
      scrollWheelZoom={true}
      style={{ height: height }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {!centerMap && <MarkerClusterGroup chunkedLoading>{storePoi()}</MarkerClusterGroup>}
      {centerMap && storePoi()}
      {userPoi}
    </MapContainer>
  )
}

export { Map }
