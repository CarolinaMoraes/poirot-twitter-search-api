module.exports = {
    provideClient() {
        require('dotenv').config();
        const Twit = require('twit');
        const T = new Twit({
            consumer_key: process.env.consumer_key,
            consumer_secret: process.env.consumer_secret,
            access_token: process.env.access_token,
            access_token_secret: process.env.access_token_secret,
        })
        return T;
    },

    /**
     * Retorna um objeto-usuário do twitter
     * @param {import { Twit } from "twit";} twitterClient 
     */
    getUsuario(twitterClient, screenName) {
        return new Promise((resolve, reject) => {

            twitterClient.get("/users/show", { screen_name: screenName }, (erro, data) => {
                if (!erro) {
                    resolve(data);
                }

                else {
                    reject(erro);
                }
            })

        })
    },

    /**
     * Busca se 2 contas se seguem no twitter
     * @param {import { Twit } from "twit";} twitterClient 
     */
    getConexaoEntreContas(twitterClient, nomeFonte, nomeAlvo) {
        return new Promise((resolve, reject) => {
            twitterClient.get("/friendships/show", { source_screen_name: nomeFonte, target_screen_name: nomeAlvo }, (erro, data) => {
                if (!erro) {
                    resolve(data);
                }

                else {
                    reject(erro);
                }
            });
        })
    }
}