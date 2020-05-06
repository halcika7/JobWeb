import { FC, ComponentClass } from 'react';
import {
  connect as redux_connect,
  MapStateToProps,
  MapDispatchToProps,
} from 'react-redux';
import { AppState } from '@store/RootReducer';

export const connect = (
  Component: FC<any> | ComponentClass,
  mapStateToProps: MapStateToProps<any, any, AppState>,
  mapDispatchToProps: MapDispatchToProps<any, any> | {}
) =>
  redux_connect<any, any, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
