const environment = {
  SERVER_URL:
    window.env?.VITE_APP_SERVER_URL || import.meta.env.VITE_APP_SERVER_URL,
  NODE_ENV: window.env?.VITE_APP_NODE_ENV || import.meta.env.VITE_APP_NODE_ENV,
  STRIPE_PUBLISHABLE_KEY:
    window.env?.VITE_APP_STRIPE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY,
  CURRENCY_EXCHANGE_KEY:
    window.env?.VITE_APP_CURRENCY_EXCHANGE_KEY ||
    import.meta.env.VITE_APP_CURRENCY_EXCHANGE_KEY,
  COUNTRY_KEY:
    window.env?.VITE_APP_COUNTRY_KEY || import.meta.env.VITE_APP_COUNTRY_KEY,
  COUNTRY_KEY_EMAIL:
    window.env?.VITE_APP_COUNTRY_KEY_EMAIL ||
    import.meta.env.VITE_APP_COUNTRY_KEY_EMAIL,
  GT4_MEASUREMENT_ID:
    window.env?.VITE_APP_GT4_MEASUREMENT_ID ||
    import.meta.env.VITE_APP_GT4_MEASUREMENT_ID,
};

export default environment;
