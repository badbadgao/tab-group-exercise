import React from 'react';

import TabPanelWrapper from 'components/TabPanelWrapper';

type TProps = {
  tabId: string;
};

const AboutPage = ({ tabId }: TProps): JSX.Element => {
  return (
    <TabPanelWrapper tabId={tabId}>
      <h1>This is about page</h1>
    </TabPanelWrapper>
  );
};

export default AboutPage;
