export const getEnvs = () => {
  return {
    BASE_URL: import.meta.env.VITE_SUPABASE_URL,
    ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    APP_ID: import.meta.env.VITE_SUPABASE_ID,
    FRONT_URL: import.meta.env.VITE_FRONT_URL,
    PAYPAL_EMAIL: import.meta.env.VITE_PAYPAL_EMAIL,
  };
};
