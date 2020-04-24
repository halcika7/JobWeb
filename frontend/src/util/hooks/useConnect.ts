import { FC, ComponentClass } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { AppState } from 'store/RootReducer';

export const useConnect = (
  Component: FC<any> | ComponentClass,
  mapStateToProps: MapStateToProps<any, any, AppState>,
  mapDispatchToProps: MapDispatchToProps<any, any> | {}
) =>
  connect<any, any, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
