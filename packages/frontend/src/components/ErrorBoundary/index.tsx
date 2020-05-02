import * as React from 'react';

interface Info {
  componentStack: string;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error; info: Info }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: { message: '', stack: '', name: '' },
      info: { componentStack: '' },
    };
  }

  componentDidCatch(error: Error, info: Info) {
    this.setState(() => ({ error, info, hasError: true }));
  }

  render(): React.ReactNode {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    const display: any = hasError ? (
      <>
        <h1>{error.toString()}</h1>
        <h1>{info.componentStack.toString()}</h1>
      </>
    ) : (
      <>{children}</>
    );

    return display;
  }
}

export default ErrorBoundary;
