const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplates = require('email-templates');
const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../config/config');
const emailTemplate = require('../email-templates');
const ApiError = require("../error/ApiError");

const sendEmail = async (receiverEmail, emailAction, locals ={}) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD
        }
    });

    const templateInfo = emailTemplate[emailAction];

    if (!templateInfo) {
        throw new ApiError('Wrong template', 500);
    }

    const templateRenderer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });

    Object.assign(locals || {}, {frontendURL: 'google.com'})

    const html = await templateRenderer.render(templateInfo.templateName, locals);

    return transporter.sendMail({
        from: 'No reply',
        to: receiverEmail,
        subject: templateInfo.subject,
        html

    })
}

module.exports = {
    sendEmail
}