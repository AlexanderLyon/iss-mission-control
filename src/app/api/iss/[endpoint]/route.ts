import type { NextRequest } from 'next/server';
import type { ISSPositionData, CrewData } from '@/types/shared';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  const { endpoint } = await params;
  let data: ISSPositionData | CrewData;

  switch (endpoint.toLowerCase()) {
    case 'location':
      const locationRes = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      data = (await locationRes.json()) as ISSPositionData;
      break;
    case 'crew':
      const crewRes = await fetch('http://api.open-notify.org/astros.json');
      data = (await crewRes.json()) as CrewData;
      break;
    default:
      return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
