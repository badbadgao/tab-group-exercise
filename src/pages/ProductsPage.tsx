import React from 'react';
import TabPanelWrapper from 'components/TabPanelWrapper';

type TProps = {
  tabId: string;
};

const ProductsPage = ({ tabId }: TProps): JSX.Element => {
  return (
    <TabPanelWrapper tabId={tabId}>
      <h1>This is products page</h1>
    </TabPanelWrapper>
  );
};

export default ProductsPage;
