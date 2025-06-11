import type { Session } from '@supabase/supabase-js';
import { createContext } from 'preact';

export type SessionContextType = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const SessionContext = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
});
