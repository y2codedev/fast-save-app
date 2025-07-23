import React from 'react';
import { Button } from '@/constants';

interface SVGOutputProps {
  showCode: boolean
  onDownload: () => void;
  onCopyCode: () => void;
}

const SVGOutput: React.FC<SVGOutputProps> = ({
  onDownload,
  onCopyCode,
  showCode
}) => {
  return (
    <div className="mt-8">
      <div className="flex sm:justify-end justify-between gap-4 items-center mb-4">
        <Button
          onClick={onDownload}
          icon={true}
          labal='Download'
        />

        <button
          onClick={onCopyCode}
          className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
        >
          {showCode ? "Copyid" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default SVGOutput;

