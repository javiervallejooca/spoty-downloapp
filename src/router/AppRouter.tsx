import Router, { Route } from 'preact-router';
import { useContext, useEffect } from 'preact/hooks';

import { supabase } from '../config/supabaseClient';
import { SessionContext } from '../context/SessionContext';

import Layout from '../layout/Layout';
import About from '../pages/About';
import DownloadSong from '../pages/DownloadSong';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import ResetPasswordPage from '../pages/ResetPassword';
import Youtube from '../pages/Youtube';

const AppRouter = () => {
  const { session, setSession } = useContext(SessionContext);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener?.subscription.unsubscribe();
  }, [setSession]);

  return (
    <Router>
      <Route
        path='/'
        component={() =>
          session ? (
            <Layout>
              <DownloadSong />
            </Layout>
          ) : (
            <Login />
          )
        }
      />

      <Route
        path='/nueva-contrasena'
        component={() => (session ? <Page404 /> : <ResetPasswordPage />)}
      />

      <Route
        path='/acerca-de'
        component={() =>
          session ? (
            <Layout>
              <About />
            </Layout>
          ) : (
            <Login />
          )
        }
      />

      <Route
        path='/youtube'
        component={() =>
          session ? (
            <Layout>
              <Youtube />
            </Layout>
          ) : (
            <Login />
          )
        }
      />

      {/* <Route
        path='/apoyar'
        component={() =>
          session ? (
            <Layout>
              <PayPalDonation />
            </Layout>
          ) : (
            <Login />
          )
        }
      /> */}

      <Route default component={Page404} />
    </Router>
  );
};

export default AppRouter;
