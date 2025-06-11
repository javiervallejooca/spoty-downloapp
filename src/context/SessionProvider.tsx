// context/SessionProvider.tsx
import { useEffect, useState } from 'preact/hooks';

import type { Session } from '@supabase/supabase-js';
import type { ComponentChildren } from 'preact';
import { SessionContext } from './SessionContext';

interface SessionProviderProps {
  children: ComponentChildren;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);

  // (Opcional) Recuperar sesión guardada en localStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('session');
    if (stored) {
      setSession(JSON.parse(stored));
    }
  }, []);

  // (Opcional) Guardar sesión automáticamente
  useEffect(() => {
    if (session) {
      sessionStorage.setItem('session', JSON.stringify(session));
    } else {
      sessionStorage.removeItem('session');
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
