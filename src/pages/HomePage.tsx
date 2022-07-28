import React from 'react';
import TabPanelWrapper from 'components/TabPanelWrapper';

type TProps = {
  tabId: string;
};

const HomePage = ({ tabId }: TProps): JSX.Element => {
  return (
    <TabPanelWrapper tabId={tabId}>
      <h1>This is home page</h1>
      <p>
        Learn to use the accessibility semantics defined by the Accessible Rich Internet Application (ARIA)
        specification to create accessible web experiences. This guide describes how to apply accessibility semantics to
        common design patterns and widgets. It provides design patterns and functional examples complemented by in-depth
        guidance for fundamental practices.
      </p>
    </TabPanelWrapper>
  );
};

export default HomePage;
