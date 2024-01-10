module.exports = function(m) {
    /**
     * Instantiation of function dependencies
     */
    const axios = require('axios');
    const qs = require('qs');

    /**
     * Importing the config file containing BOT data
     */
    const config = require('../config');

    /**
     * Function for sending embeds on Discord
     */
    const embed = require('../embed');

    /**
     * If the command is not "call" or "calltest," then end the function
     */
    if (m.command !== "call" && m.command !== "calltest") return false;

    /**
     * If the command doesn't contain 2 arguments, end the function and return an error
     */
    if(m.args.length < 2) return embed(m.message, 'Need more arguments', 15158332, 'You need to provide 2 arguments, example: **!call 33612345678 paypal**', m.user);
    
    /**
     * If the phone number or service name does not match the regex, return an error
     */
    if(!m.args['0'].match(/^\d{8,14}$/g)) return embed(m.message, 'Bad phone number', 15158332, 'This phone number is not valid, a valid one: **33612345678**', m.user);
    if(!m.args['1'].match(/[a-zA-Z]+/gm)) return embed(m.message, 'Bad service name', 15158332, 'This service name is not valid, a valid one: **paypal**', m.user);
    
    /**
     * If the command is !calltest, switch to test call with the user "test"
     */
    m.user = m.command == "calltest" ? 'test' : m.user;
    m.args['2'] = m.args['2'] == undefined ? '' : m.args['2'];

    /**
     * If all conditions have been met, send a request to the call API
     */
    axios.post(config.apiurl + '/call/', qs.stringify({
        password: config.apipassword,
        to: m.args['0'],
        user: m.user,
        service: m.args['1'].toLowerCase(),
        name: m.args['2'].toLowerCase() || null
    }))
    .catch(error => {
        console.error(error)
    })

    /**
     * Response indicating that the API call has been successfully made
     */
    return embed(m.message, 'Call sent', 3066993, 'The API call has been sent to **' + m.args['0'] + '** using **' + m.args['1'] + '** service.', m.user)
}
