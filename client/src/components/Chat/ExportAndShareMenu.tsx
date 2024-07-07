import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import DropDownMenu from '~/components/Conversations/DropDownMenu';
import ShareButton from '~/components/Conversations/ShareButton';
import HoverToggle from '~/components/Conversations/HoverToggle';
import useLocalize from '~/hooks/useLocalize';
import ExportButton from './ExportButton';
import store from '~/store';
import { cn } from '~/utils';

export default function ExportAndShareMenu({
  isSharedButtonEnabled,
  className = '',
  exportButtonClassName = '',
}: {
  isSharedButtonEnabled: boolean;
  className?: string;
  exportButtonClassName?: string;
}) {
  const localize = useLocalize();

  const conversation = useRecoilValue(store.conversationByIndex(0));
  const [isPopoverActive, setIsPopoverActive] = useState(false);

  const exportable =
    conversation &&
    conversation.conversationId &&
    conversation.conversationId !== 'new' &&
    conversation.conversationId !== 'search';

  if (!exportable) {
    return <div className="h-9 w-9" />;
  }

  const isActiveConvo = exportable;

  return (
    <HoverToggle
      isActiveConvo={!!isActiveConvo}
      isPopoverActive={isPopoverActive}
      setIsPopoverActive={setIsPopoverActive}
      className={className}
    >
      <DropDownMenu
        icon={<Upload />}
        tooltip={localize('com_endpoint_export_share')}
        className="pointer-cursor relative z-50 flex h-9 w-9 min-w-4 flex-none flex-col items-center justify-center rounded-md bg-white px-3 text-left focus:outline-none focus:ring-0 focus:ring-offset-0 radix-state-open:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:radix-state-open:bg-gray-700 sm:text-sm"
      >
        {conversation && conversation.conversationId && (
          <>
            <ExportButton className={cn("mb-0", exportButtonClassName)} conversation={conversation} setPopoverActive={setIsPopoverActive} iconSize={18} />
            {isSharedButtonEnabled && (
              <ShareButton
                conversationId={conversation.conversationId}
                title={conversation.title ?? ''}
                appendLabel={true}
                className="mt-0"
                setPopoverActive={setIsPopoverActive}
              />
            )}
          </>
        )}
      </DropDownMenu>
    </HoverToggle>
  );
}
