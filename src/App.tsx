import AppRouter from './router/AppRouter';
import SessionProvider from './context/SessionProvider';

export function App() {
  // const { session, setSession } = useContext(SessionContext);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data }) => setSession(data.session));

  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     (_event, session) => setSession(session)
  //   );

  //   return () => listener?.subscription.unsubscribe();
  // }, [setSession]);

  return (
    <SessionProvider>
      {/* {!session ? <AuthForm /> : <DownloadForm />} */}
      <AppRouter />
    </SessionProvider>
  );
}
