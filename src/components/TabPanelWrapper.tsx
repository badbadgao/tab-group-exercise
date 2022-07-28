import React from 'react';

type TProps = {
  tabId: string;
  children: React.ReactNode;
};

const TabPanelWrapper = ({ tabId, children }: TProps): JSX.Element => {
  return (
    <div id={`tabpanel-${tabId}`} role="tabpanel" aria-labelledby={`tab-${tabId}`} tabIndex={0}>
      {children}
    </div>
  );
};

export default TabPanelWrapper;
