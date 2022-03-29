const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.MONGODB_URI || 'adres bazy danych',
  JwtSecret: process.env.JWT_SECRET || 'secret'
};

export default config;
