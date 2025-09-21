'use client';
import { useState, useEffect, useRef } from 'react';
import { Header, HeaderName } from '@carbon/react';
import type { ISSPositionData } from '@/types/shared';
import { Panel, MapPanel, CrewPanel, StatsPanel, ActionsPanel } from './panels';
import type { MapPanelHandle } from './panels/map';

export default function Home() {
  const [issData, setIssData] = useState<ISSPositionData>();
  const [lastUpdated, setLastUpdated] = useState<string>();
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const mapPanelRef = useRef<MapPanelHandle>(null);

  const fetchISSPosition = async (): Promise<void> => {
    try {
      const data = await fetch('api/iss/location');
      const issData: ISSPositionData = await data.json();

      if (data?.status !== 200 || !issData) {
        throw new Error('Failed to load');
      } else {
        setIssData(issData);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error fetching ISS position:', error);
    }
  };

  useEffect(() => {
    if (autoUpdate) {
      fetchISSPosition();
      const interval = setInterval(fetchISSPosition, 10000);
      return () => clearInterval(interval);
    }
  }, [autoUpdate]);

  return (
    <div className="font-mono items-center justify-items-center min-h-screen pt-20 pb-10 px-9 md:px-10 gap-16">
      <Header>
        <HeaderName href="#" prefix="" className="flex-shrink-0">
          ISS Mission Control
        </HeaderName>
        <div className="ml-auto py-0 px-[1rem] text-[11px] text-right md:text-left md:text-xs">
          {lastUpdated && <p>Last updated: {lastUpdated}</p>}
        </div>
      </Header>
      <main className="flex flex-row flex-wrap gap-[32px] row-start-2 items-center sm:items-start w-full max-w-[1800px] relative">
        {issData?.latitude && issData?.longitude && (
          <p className="coordinates fixed left-[1rem] top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-270 origin-center z-50 px-2 whitespace-nowrap opacity-50 text-md">
            {`${issData.latitude}, ${issData.longitude}`}
          </p>
        )}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8 auto-rows-auto">
          <Panel className="Tile__Map order-1 md:order-none">
            <MapPanel ref={mapPanelRef} issData={issData} />
          </Panel>
          <Panel className="order-3 md:order-none">
            <StatsPanel issData={issData} />
          </Panel>
          <Panel className="order-2 md:order-none">
            <ActionsPanel
              autoUpdate={autoUpdate}
              toggleAutoUpdate={() => setAutoUpdate(!autoUpdate)}
              centerISS={() => mapPanelRef.current?.centerISS()}
            />
          </Panel>
          <Panel className="order-4 md:order-none">
            <CrewPanel />
          </Panel>
        </div>
      </main>
    </div>
  );
}
