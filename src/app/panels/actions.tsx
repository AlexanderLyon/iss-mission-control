import { useState } from 'react';
import { Button, IconButton, Heading, Modal } from '@carbon/react';
import { Launch, Video, CenterSquare, Pause, Play } from '@carbon/icons-react';

interface IActionsPanelProps {
  autoUpdate: boolean;
  toggleAutoUpdate: () => void;
  centerISS: () => void;
}

export const ActionsPanel: React.FC<IActionsPanelProps> = ({
  autoUpdate,
  toggleAutoUpdate,
  centerISS,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Heading className="mb-3 uppercase text-lg">Controls</Heading>
      <div className="flex flex-row flex-wrap gap-4">
        <IconButton label="Center ISS" onClick={centerISS}>
          <CenterSquare />
        </IconButton>
        <IconButton
          label={autoUpdate ? 'Pause Updates' : 'Resume Updates'}
          onClick={toggleAutoUpdate}
        >
          {autoUpdate ? <Pause /> : <Play />}
        </IconButton>
      </div>
      <hr className="my-4 border-[var(--cds-border-subtle)]" />
      <div className="flex flex-row flex-wrap gap-4">
        <Button
          className="flex-1 whitespace-nowrap"
          onClick={(e) => setIsModalOpen(true)}
          renderIcon={Video}
        >
          Camera View
        </Button>
        <Button
          className="flex-1 whitespace-nowrap"
          kind="secondary"
          href="https://www.nasa.gov/international-space-station/"
          target="_blank"
          renderIcon={Launch}
        >
          Learn More
        </Button>
        <Modal
          open={isModalOpen}
          passiveModal
          className="z-50"
          modalHeading="Camera View"
          primaryButtonText="Close"
          onRequestClose={() => setIsModalOpen(false)}
          preventCloseOnClickOutside={false}
        >
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube-nocookie.com/embed/yf5cEJULZXk?si=BlRgzeNiRCl245Vj&autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Modal>
      </div>
    </div>
  );
};
