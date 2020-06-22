import React, { ReactNode, FC } from 'react';
import { store, Provider } from '@job/redux';

const ReduxProvider: FC<{
  children: ReactNode;
}> = ({ children }) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
