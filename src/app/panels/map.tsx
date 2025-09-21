'use client';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import Script from 'next/script';
import type { ISSPositionData } from '@/types/shared';

interface GmpMap3DElement extends HTMLElement {
  center?: { lat: number; lng: number; altitude: number } | null;
  mode?: string;
  range?: string;
  tilt?: string;
  heading?: string;
}

interface Marker3DElementOptions {
  position: { lat: number; lng: number; altitude: number };
  altitudeMode: 'ABSOLUTE' | string;
  extruded?: boolean;
  label?: string;
}

type Maps3DLibraryWithMarker = google.maps.Maps3DLibrary & {
  Marker3DElement: new (options: Marker3DElementOptions) => HTMLElement;
};

interface IMapPanelProps {
  issData?: ISSPositionData;
}

const defaultCameraAltitude = 9000000;

export interface MapPanelHandle {
  centerISS: () => void;
}

export const MapPanel = forwardRef<MapPanelHandle, IMapPanelProps>(({ issData }, ref) => {
  const [inFreeLookMode, setInFreeLookMode] = useState(false);
  const mapRef = useRef<GmpMap3DElement | null>(null);
  const markerRef = useRef<HTMLElement | null>(null);

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
    if (!mapRef.current || !('google' in window)) return;

    const { PinElement } = (await window.google.maps.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    const { Marker3DElement } = (await window.google.maps.importLibrary(
      'maps3d'
    )) as Maps3DLibraryWithMarker;

    if (!Marker3DElement) return;

    // Remove previous marker if present:
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    const marker = new Marker3DElement({
      position: { lat: latitude, lng: longitude, altitude: altitudeKm * 1000 }, // altitude in meters
      altitudeMode: 'ABSOLUTE',
      extruded: true,
      label: 'International Space Station',
    });

    const glyphSvgPinElement = new PinElement({
      background: 'white',
      borderColor: '#0f62fe',
      glyph: new URL(`${window.location.origin}/International_Space_Station.svg`),
      scale: 6,
    });

    marker.append(glyphSvgPinElement);
    mapRef.current.append(marker);
    markerRef.current = marker;
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
      ></gmp-map-3d>
      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=beta&libraries=maps3d`}
      ></Script>
    </>
  );
});

MapPanel.displayName = 'MapPanel';
