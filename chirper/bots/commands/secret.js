module.exports = function(m) {
    /**
     * Instantiation of dependencies for using SQLITE3
     */
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('./db/data.db');

    /**
     * Function for using embeds
     */
    const embed = require('../embed');

    /**
     * File containing variable data for the BOT
     */
    const config = require('../config');

    /**
     * Check if the command is indeed secret; otherwise, end the function
     */
    if (m.command !== "secret") return false;

    /**
     * If the user has not provided 2 arguments, return an error
     */
    if (m.args.length != 2) return embed(m.message, 'Need more arguments', 15158332, 'You need to give 2 arguments, example: **!secret yoursecretpass @example**', m.user);

    /**
     * Check if the 2nd argument is the emergency password,
     * the password is converted to lowercase from the config file because all arguments provided in commands are converted to lowercase,
     * If the password matches, then continue
     */
    var cmd = m.args[0];
    if(cmd != config.secretpassword.toLowerCase()) return embed(m.message, 'Bad first argument', 15158332, 'The first argument needs to be your secret password, example: **!secret yoursecretpass @example**', m.user);

    /**
     * Did the user mention the user to set as admin? If yes, proceed; otherwise, return an error
     */
    const user = m.message.mentions.users.first();
    if (!user) return embed(m.message, 'Mention', 15158332, 'You didn\'t mention the user to set as admin.', m.user);

    /**
     * Check if the user is indeed on the server
     */
    const member = m.message.guild.member(user);
    if (!member) return embed(m.message, 'Not possible', 15158332, '@' + username + ' is not on your server. Or wasn\'t found.', m.user);

    /**
     * Creation of constants, information about the user to set as admin
     */
    const userid = member.user.id,
        username = member.user.username,
        discriminator = member.user.discriminator,
        date = Date.now();

    /**
     * Remove the user role from the person, as they become an Admin
     */
    let userrole = m.message.guild.roles.cache.find(r => r.name === config.botuser_rolename);
    member.roles.remove(userrole).catch(console.error);

    /**
     * And add the Admin role to them
     */
    let adminrole = m.message.guild.roles.cache.find(r => r.name === config.admin_rolename);
    member.roles.add(adminrole).catch(console.error);

    /**
     * Check if the user is already in the database
     */
    db.get('SELECT * FROM users WHERE userid  = ?', [userid], (err, row) => {
        if (err) { return console.error(err.message); }
        
        /**
         * If not, add them
         */
        if(row == undefined) {
            db.run(`INSERT INTO users(userid, username, discriminator, date, permissions) VALUES(?, ?, ?, ?, ?)`, [userid, username, discriminator, date, 0], function(err) {
                if (err) {
                    return console.log(err.message);
                }
    
                return embed(m.message, 'User been added', 3066993, '@' + username + ' has been added to the database.', m.user);
            });
        } else if(row.permissions == 0){
            /**
             * If they are already Admin, send an error
             */
            return embed(m.message, 'Already Admin', 15158332, '@' + username + ' is already Admin. If you want to delete them as admin,\n type: **!user delete @username**', m.user);
        } else {
            /**
             * Otherwise, update their grade in the DB
             */
            db.run(`UPDATE users SET permissions = ? WHERE userid = ?`, [0, userid], function(err) {
                if (err) {
                  return console.log(err.message);
                }
    
                return embed(m.message, 'Upgrade successfully', 3066993, '@' + username + ' is now Admin. They can use the bot as an Admin. If you want to delete them as admin,\n type: **!user delete @username**', m.user);
            });
        }
    });
}
