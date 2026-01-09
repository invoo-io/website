'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component specifically designed for calculators.
 * Catches JavaScript errors in calculator components and displays
 * a user-friendly fallback UI instead of crashing the entire page.
 *
 * @example
 * ```tsx
 * <CalculatorErrorBoundary>
 *   <SueldoNetoAutonomoCalculator />
 * </CalculatorErrorBoundary>
 * ```
 */
export class CalculatorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging (in production, this could be sent to an error tracking service)
    console.error('Calculator error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const {
        fallbackTitle = 'Error en la calculadora',
        fallbackDescription = 'Ha ocurrido un error al procesar los datos. Por favor, recarga la página o inténtalo de nuevo.',
      } = this.props;

      return (
        <div
          className="w-full max-w-4xl mx-auto rounded-3xl p-6 md:p-8 lg:p-10 border border-strokes-primary bg-background-secondary"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex flex-col items-center justify-center text-center py-12">
            {/* Error icon */}
            <div className="w-16 h-16 rounded-full bg-accent-red-soft/10 flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-accent-red-main"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h3 className="text-title2-emphasized text-primary mb-2">
              {fallbackTitle}
            </h3>

            <p className="text-body text-secondary max-w-md mb-6">
              {fallbackDescription}
            </p>

            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue-main text-white text-callout-emphasized hover:bg-accent-blue-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue-main focus:ring-offset-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Intentar de nuevo
            </button>

            {/* Technical details for debugging (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 w-full max-w-md text-left">
                <summary className="cursor-pointer text-footnote text-tertiary hover:text-secondary">
                  Detalles técnicos
                </summary>
                <pre className="mt-2 p-4 bg-background-primary rounded-lg text-caption2 text-tertiary overflow-auto">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
