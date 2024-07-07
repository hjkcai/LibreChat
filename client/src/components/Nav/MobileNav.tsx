import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import type { Dispatch, SetStateAction } from 'react';
import { useLocalize, useNewConvo } from '~/hooks';
import store from '~/store';
import { ModelSpecsMenu } from '~/components/Chat/Menus';
import ExportAndShareMenu from '~/components/Chat/ExportAndShareMenu';
import { useGetStartupConfig } from 'librechat-data-provider/react-query';

export default function MobileNav({
  setNavVisible,
}: {
  setNavVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: startupConfig } = useGetStartupConfig();
  const modelSpecs = useMemo(() => startupConfig?.modelSpecs?.list ?? [], [startupConfig]);
  const localize = useLocalize();
  const { newConversation } = useNewConvo(0);

  return (
    <div className="border-token-border-medium bg-token-main-surface-primary sticky top-0 z-10 flex min-h-[40px] items-center justify-center border-b bg-white pl-1 dark:bg-gray-800 dark:text-white md:hidden md:hidden">
      <button
        type="button"
        data-testid="mobile-header-new-chat-button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50 dark:hover:text-white"
        onClick={() =>
          setNavVisible((prev) => {
            localStorage.setItem('navVisible', JSON.stringify(!prev));
            return !prev;
          })
        }
      >
        <span className="sr-only">{localize('com_nav_open_sidebar')}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-md"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <h1 className="ml-auto mr-auto overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-normal">
        {modelSpecs?.length > 0 && <ModelSpecsMenu modelSpecs={modelSpecs} />}
      </h1>
      <ExportAndShareMenu
        isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
        className="pr-1"
        exportButtonClassName="border-0"
      />
    </div>
  );
}
