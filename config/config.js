import dotenv from 'dotenv';
// import Joi from 'joi';

dotenv.config();
// const envVarsSchema = Joi.object()
//     .keys({
//         NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
//         PORT: Joi.number().default(3000),
//         MONGODB_URL: Joi.string().required().description('Mongo DB url'),
//         // JWT_SECRET: Joi.string().required().description('JWT secret key'),
//         // JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
//         // JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
//         // JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
//         //     .default(60)
//         //     .description('minutes after which reset password token expires'),
//         // JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
//         //     .default(60)
//         //     .description('minutes after which verify email token expires'),
//         // SMTP_HOST: Joi.string().description('server that will send the emails'),
//         // SMTP_PORT: Joi.number().description('port to connect to the email server'),
//         // SMTP_USERNAME: Joi.string().description('username for email server'),
//         // SMTP_PASSWORD: Joi.string().description('password for email server'),
//         // EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
//         // SMTP_PASSWORD: Joi.string().description('password for email server'),
//         APP_URL: Joi.string().description('app main url'),
//         // APP_NAME: Joi.string().description('app name '),
//         // FRONT_APP_URL: Joi.string().description('app name '),
//         // LINKED_APP_URL: Joi.string().description('app name '),
//     })
//     .unknown();

// const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
const envVars = process.env

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        //   options: {
        //    useCreateIndex: true,
        //    useNewUrlParser: true,
        //    useUnifiedTopology: true,
        //  },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    appUrl: envVars.APP_URL,
}
export default config;