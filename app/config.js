const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://fragmentapp:EZWDE5S69lpi8n2h@cluster0.jet0b.mongodb.net/fragment?retryWrites=true&w=majority',
  JwtSecret: process.env.JWT_SECRET || 'secret'
};


export default config;
