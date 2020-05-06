import React, { ReactNode, FC } from 'react';
import { Provider } from 'react-redux';

import store from './index';

interface Props {
  children: ReactNode;
}

const ReduxProvider: FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
