/**
 * Instanciation des dépendances discord et création du client discord
 */
const Discord = require('discord.js');
const client = new Discord.Client();

/**
 * Fichier stockant les informations variables du BOT
 */
const config = require('./config');

/**
 * Authentification du BOT grâce au token DISCORD
 */
client.login(config.discordtoken);

/**
 * Instanciation des données nécéssaires à l'utilisation de SQLITE3 et de sa DB
 */
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db');

/**
 * Fonction permettant d'envoyer des "embed" => forme de blocs markdown sur discord
 */
const embed = require('./embed');

/**
 * Instanciation de toutes les commandes déportées sous formes de fonctions pour simplifier le fichier
 */
const call = require('./commands/call');
const usercmd = require('./commands/user');
const secret = require('./commands/secret');
const help = require('./commands/help');

/**
 * Création des constantes permettant le fonctionnement du bot
 */
const prefix = config.discordprefix;

/**
 * Dès que le bot est "ready" (prêt), l'annoncer en console et mettre comme status !help
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`${prefix}help`); 
});

/**
 * Lorsqu'un message est reçu, lancer le code contenu dans la fonction
 */
client.on("message", function(message) {
    /**
     * Si l'auteur du message est un bot, finir la fonction
     */
    if (message.author.bot) return;

    /**
     * Si le message ne commence pas par le préfix défini, alors ce n'est pas une commande et finir la fonction
     */
    if (!message.content.startsWith(prefix)) return;

    /**
     * Instanciation de toutes les variables permettant l'utilisation du bot et des informations fournies
     */
    const commandBody = message.content.slice(prefix.length).toLowerCase();
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const user = "@" + message.author.username + '#' + message.author.discriminator;
    const all = { commandBody, args, command, message, user };

    /**
     * Si l'utilisateur rentre une commande et qu'elle existe, alors la lancer
     */
    switch (command) {
        case 'call':
        case 'calltest':
            call(all);
            break;
        case 'user':
            usercmd(all);
            break;
        case 'secret':
            secret(all);
            break;
        case 'help':
            help(all);
            break;
        default:
            break;
    }
});
