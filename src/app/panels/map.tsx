'use client';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import Script from 'next/script';
import type { ISSPositionData, GmpMap3DElement, GmpMarker3DElement } from '@/types/shared';

interface IMapPanelProps {
  issData?: ISSPositionData;
}

const defaultCameraAltitude = 9000000;

export interface MapPanelHandle {
  centerISS: () => void;
}

export const MapPanel = forwardRef<MapPanelHandle, IMapPanelProps>(({ issData }, ref) => {
  const [inFreeLookMode, setInFreeLookMode] = useState(false);
  const mapRef = useRef<GmpMap3DElement>(null);
  const markerRef = useRef<GmpMarker3DElement>(null);

  const centerISS = useCallback(() => {
    if (!issData || !mapRef.current) return;
    setInFreeLookMode(false);
    mapRef.current.center = {
      lat: issData.latitude,
      lng: issData.longitude,
      altitude: defaultCameraAltitude,
    };
  }, [issData]);

  useImperativeHandle(ref, () => ({ centerISS }), [centerISS]);

  const setMapMarker = async (latitude: number, longitude: number, altitudeKm: number) => {
    if (!mapRef.current || !markerRef.current || !('google' in window)) return;

    const { PinElement, AdvancedMarkerElement } = (await window.google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    markerRef.current.position = { lat: latitude, lng: longitude, altitude: altitudeKm * 1000 }; // altitude in meters

    const markerContent =
      typeof PinElement === 'function'
        ? new PinElement({
            background: 'white',
            borderColor: '#0f62fe',
            glyph: new URL(`${window.location.origin}/International_Space_Station.png`),
            scale: 6,
          })
        : new AdvancedMarkerElement({
            content: (() => {
              const img = document.createElement('img');
              img.src = `${window.location.origin}/International_Space_Station.png`;
              img.alt = 'International Space Station';
              img.style.width = '48px';
              img.style.height = '48px';
              return img;
            })(),
          }).element;

    markerRef.current.replaceChildren(markerContent);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    const enableFreeLook = () => setInFreeLookMode(true);
    mapRef.current.addEventListener('gmp-centerchange', enableFreeLook);

    return () => {
      if (mapRef.current) {
        mapRef.current.removeEventListener('gmp-centerchange', enableFreeLook);
      }
    };
  }, [mapRef.current]);

  useEffect(() => {
    if (!issData || !mapRef.current) return;

    const { latitude, longitude, altitude } = issData;
    setMapMarker(latitude, longitude, Math.round(altitude));

    if (!inFreeLookMode) {
      centerISS();
    }
  }, [issData, inFreeLookMode, centerISS]);

  return (
    <>
      <gmp-map-3d
        ref={mapRef}
        mode="hybrid"
        range="2000"
        tilt="0"
        heading="0"
        min-altitude="30000"
        defaultUIDisabled
      >
        <gmp-marker-3d
          ref={markerRef}
          position=""
          altitude-mode="absolute"
          extruded="true"
          label="International Space Station"
        ></gmp-marker-3d>
      </gmp-map-3d>
      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=beta&libraries=maps3d`}
      ></Script>
    </>
  );
});

MapPanel.displayName = 'MapPanel';
