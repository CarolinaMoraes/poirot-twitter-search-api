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
 * Routes Definitions
 */

app.get("/conexao/:usuarioFonte/com/:usuarioAlvo", (req, res) => {
    const twitter = twitterClient.provideClient();
    twitter.get("/friendships/show", { source_screen_name: req.params.usuarioFonte, target_screen_name: req.params.usuarioAlvo }, (erro, data) => {
        if (!erro) {
            const relacionamento = {
                fonteSegueAlvo: data.relationship.source.following,
                alvoSegueFonte: data.relationship.source.followed_by
            }
            res.status(200).send(relacionamento);
        }
        else {
            res.status(429).send({ mensagem: "A quantidade máxima de requisições pelo limite de tempo foi alcançada" })
        }

    });
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});