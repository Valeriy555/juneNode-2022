module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL:process.env.MONGO_URL || 'mongodb://127.0.0.1/june2022',

    DB_PASSWORD: process.env.DB_PASSWORD || '5678876',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWorld',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWorld',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL ,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD ,
}