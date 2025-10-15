import React from "react";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: any) {
    console.error(err);
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="min-h-screen grid place-items-center">
          <div className="auth-card p-8 bg-white rounded-2xl shadow-card text-center">
            <h1 className="text-2xl font-semibold mb-2">
              Something went wrong
            </h1>
            <p className="text-slate-500">Please refresh the page.</p>
          </div>
        </div>
      );
    return this.props.children;
  }
}
