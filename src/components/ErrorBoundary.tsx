

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Une erreur inattendue est survenue.";
      let isFirestoreError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.operationType) {
            isFirestoreError = true;
            errorMessage = "Erreur de base de données : " + (parsed.error || "Accès refusé");
          }
        }
      } catch (e) {
        // Not a JSON error
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-500/10">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Oups !</h1>
            <p className="text-gray-600 mb-10 leading-relaxed">
              {errorMessage}
            </p>
            
            {isFirestoreError && (
              <div className="mb-10 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 text-xs font-medium text-left">
                <p className="font-bold mb-1 uppercase tracking-wider">Note Technique :</p>
                <p>Cette erreur peut être due à une restriction de sécurité ou à un problème de connexion. Veuillez vérifier votre connexion internet ou contacter l'administration.</p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-5 h-5" /> Réessayer
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="btn-secondary w-full py-4 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" /> Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
