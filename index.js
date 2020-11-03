/**
 * Required External Modules
 */
const express = require('express');
const twitterClient = require('./twitter/twitterClient');

/**
 * App variables
 */
const app = express();
const port = process.env.PORT || "3000";


/**
 * Body parser
 *  
*/
app.use(express.urlencoded({ extended: false }));

/**
 * Enabling CORS
 */
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

});


/**
 * Routes Definitions
 */

app.get("/conexao/:usuarioFonte/com/:usuarioAlvo", async (req, res) => {
    const twitter = twitterClient.provideClient();

    try {
        const resposta = await twitterClient.getConexaoEntreContas(twitter, req.params.usuarioFonte, req.params.usuarioAlvo);

        const relacionamento = {
            fonteSegueAlvo: resposta.relationship.source.following,
            alvoSegueFonte: resposta.relationship.source.followed_by
        }

        let userFonte = {};
        let userAlvo = {};

        // Tenta pegar o usuário fonte e o alvo, mas se não der tudo bem :)
        try {
            userFonte = await twitterClient.getUsuario(twitter, resposta.relationship.source.screen_name);
            userAlvo = await twitterClient.getUsuario(twitter, resposta.relationship.target.screen_name);
        }

        finally {
            res.status(200).send({ relacionamento, userFonte, userAlvo });
        }
    } catch (error) {
        console.log(error);
        res.status(error.statusCode).send({ mensagem: error.allErrors[0].message });
    }
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});