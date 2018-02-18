const config = require('./../../data/config');

module.exports = (token) => {
    return `<html><bod>
    \`<p style="text-align: center; line-height: 2;"> Dziękujemy za założenie konta! Kliknij w poniższy przycisk aby dokończyć rejestrację. <br/>
    <a href="http://localhost:${config.PORT}/api/confirm?token=${token}" style="background: #3630A5; color: white; padding: 8px; border-radius: 5px; text-decoration: none;">Potwierdź</a>
    </p>\`
</bod></html>`
}