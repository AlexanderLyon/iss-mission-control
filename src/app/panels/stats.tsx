'use client';
import { Table, TableRow, TableCell, Tabs, Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import type { ISSPositionData } from '@/types/shared';

interface IStatsPanelProps {
  issData?: ISSPositionData;
  children?: React.ReactElement;
}

const kilometersToMiles = (km: number) => km * 0.621371;

export const StatsPanel: React.FC<IStatsPanelProps> = ({ issData }) => {
  if (!issData) {
    return null;
  }

  const StatsTable: React.FC<{ inMiles?: boolean }> = ({ inMiles }) => {
    const distanceUnit = inMiles ? 'mi' : 'km';

    return (
      <Table aria-label="ISS Stats">
        <TableRow>
          <TableCell className="uppercase font-bold">Latitude</TableCell>
          <TableCell>{issData.latitude}&deg;</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Longitude</TableCell>
          <TableCell>{issData.longitude}&deg;</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Altitude</TableCell>
          <TableCell>
            {inMiles ? kilometersToMiles(issData.altitude).toFixed(2) : issData.altitude.toFixed(2)}{' '}
            {distanceUnit}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Velocity</TableCell>
          <TableCell>
            {inMiles ? kilometersToMiles(issData.velocity).toFixed(2) : issData.velocity.toFixed(2)}{' '}
            {`${distanceUnit}/h`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Sunlight</TableCell>
          <TableCell className="capitalize">{issData.visibility}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Visibility</TableCell>
          <TableCell>
            {inMiles
              ? kilometersToMiles(issData.footprint).toFixed(2)
              : issData.footprint.toFixed(2)}{' '}
            {distanceUnit}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Solar Latitude</TableCell>
          <TableCell>{issData.solar_lat}&deg;</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Solar Longitude</TableCell>
          <TableCell>{issData.solar_lon}&deg;</TableCell>
        </TableRow>
      </Table>
    );
  };

  return (
    <Tabs>
      <TabList aria-label="Distance Unit Tabs">
        <Tab>Kilometers</Tab>
        <Tab>Miles</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <StatsTable />
        </TabPanel>
        <TabPanel>
          <StatsTable inMiles />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
