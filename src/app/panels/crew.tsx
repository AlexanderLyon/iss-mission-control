'use client';
import { useState, useEffect } from 'react';
import { Heading } from '@carbon/react';
import { User } from '@carbon/icons-react';
import type { CrewData } from '@/types/shared';

interface ICrewPanelProps {
  children?: React.ReactElement;
}

type Astronaut = { name: string };

export const CrewPanel: React.FC<ICrewPanelProps> = () => {
  const [issCrew, setIssCrew] = useState<Astronaut[]>([]);

  useEffect(() => {
    const getCrew = async () => {
      const data = await fetch('api/iss/crew');
      const crewData: CrewData = await data.json();

      if (!crewData || crewData.message !== 'success') {
        return null;
      }

      const astros: Astronaut[] = crewData.people?.reduce((acc: Astronaut[], astro) => {
        if (astro.craft === 'ISS') {
          acc.push({ name: astro.name });
        }

        return acc;
      }, []);

      setIssCrew(astros);
    };

    getCrew();
  }, []);

  const CrewMember = ({ name }: { name: string }) => {
    return (
      <div className="flex flex-col items-center gap-2 max-w-[80px] text-center">
        <div className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden flex items-center justify-center">
          <User />
        </div>
        <p className="text-[11px]">{name}</p>
      </div>
    );
  };

  return (
    <>
      <Heading className="mb-3 uppercase text-lg">Current crew</Heading>
      {issCrew?.length ? (
        <div className="flex flex-row flex-wrap gap-4">
          {issCrew.map((astro: { name: string }) => (
            <CrewMember name={astro.name} key={astro.name} />
          ))}
        </div>
      ) : null}
    </>
  );
};
