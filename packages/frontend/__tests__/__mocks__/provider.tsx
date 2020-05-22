import React, { ReactNode, FC } from 'react';
import { Provider } from 'react-redux';

import store from '@store/index';

const ReduxProvider: FC<{
  children: ReactNode;
}> = ({ children }) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
