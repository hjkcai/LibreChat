import React from 'react';

import { useState } from 'react';
import type { TConversation } from 'librechat-data-provider';
import { Upload } from 'lucide-react';
import { useLocalize } from '~/hooks';
import { ExportModal } from '../Nav';
import { cn } from '~/utils';

function ExportButton({
  conversation,
  setPopoverActive,
  iconSize = 16,
  className,
}: {
  conversation: TConversation;
  setPopoverActive: (value: boolean) => void;
  iconSize?: number;
  className?: string;
}) {
  const localize = useLocalize();

  const [showExports, setShowExports] = useState(false);

  const clickHandler = () => {
    setShowExports(true);
  };

  const onOpenChange = (value: boolean) => {
    setShowExports(value);
    setPopoverActive(value);
  };

  return (
    <>
      <button
        onClick={clickHandler}
        className={cn("group m-1.5 flex w-full cursor-pointer items-center gap-2 rounded p-2.5 text-sm hover:bg-gray-200 focus-visible:bg-gray-200 focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 dark:hover:bg-gray-600 dark:focus-visible:bg-gray-600", className)}
      >
        <Upload size={iconSize} /> {localize('com_nav_export')}
      </button>
      {showExports && (
        <ExportModal open={showExports} onOpenChange={onOpenChange} conversation={conversation} />
      )}
    </>
  );
}

export default ExportButton;
