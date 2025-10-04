export interface ISSPositionData {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  footprint: number;
  timestamp: number;
  daynum: number;
  solar_lat: number;
  solar_lon: number;
  units: string;
}

export interface CrewData {
  people: { name: string; craft: string }[];
  message: string;
  number: number;
}

export interface GmpMap3DElement extends HTMLElement {
  center?: { lat: number; lng: number; altitude: number } | null;
  mode?: string;
  range?: string;
  tilt?: string;
  heading?: string;
}

export interface Marker3DElementOptions {
  position: { lat: number; lng: number; altitude: number };
  altitudeMode: 'ABSOLUTE' | string;
  extruded?: boolean;
  label?: string;
}

export type Maps3DLibraryWithMarker = google.maps.Maps3DLibrary & {
  Marker3DElement: new (options: Marker3DElementOptions) => HTMLElement;
};
