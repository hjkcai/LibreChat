import React from 'react';
import ReactMarkdown from 'react-markdown';
import TagManager from 'react-gtm-module';
import { Constants } from 'librechat-data-provider';
import { useGetStartupConfig } from 'librechat-data-provider/react-query';
import { useLocalize } from '~/hooks';

export default function Footer({ className }: { className?: string }) {
  return <div className="py-1 md:py-2" />;
}
