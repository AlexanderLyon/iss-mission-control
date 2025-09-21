'use client';
import { Table, TableRow, TableCell } from '@carbon/react';
import type { ISSPositionData } from '@/types/shared';

interface IStatsPanelProps {
  issData?: ISSPositionData;
  children?: React.ReactElement;
}

export const StatsPanel: React.FC<IStatsPanelProps> = ({ issData }) => {
  if (!issData) {
    return null;
  }

  return (
    <>
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
          <TableCell>{issData.altitude} km</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Velocity</TableCell>
          <TableCell>{issData.velocity} km/h</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Sunlight</TableCell>
          <TableCell className="capitalize">{issData.visibility}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="uppercase font-bold">Visibility</TableCell>
          <TableCell>{issData.footprint} km</TableCell>
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
    </>
  );
};
