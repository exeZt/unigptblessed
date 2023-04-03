(function () {//api key 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
    const { Configuration, OpenAIApi } = require("openai");
    const cfg = require("./config.json");
    module.exports = this.Main = new class Main{
        request_gpt = async function (reqbody) {
            const openai = new OpenAIApi(Init());
            const completion = await openai.createCompletion({
                model: "text-davinci-003",//text-davinci-003
                prompt: reqbody,
                max_tokens: 3000
            });
            return completion.data.choices[0].text;
        }
    };
    function Init() {
        const configuration = new Configuration({
            apiKey: cfg.api_key,
        });
        return configuration;
    }
}).call(this);