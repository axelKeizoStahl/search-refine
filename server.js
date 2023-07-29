const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {Configuration, OpenAIApi} = require("openai");
const axios = require("axios"); 

const app = express();
const port = 3001; 
app.use(bodyParser.json());

app.use(cors()); 
app.post("/api/searchGoogle", async (req, res) => {
  try {
    var { query } = req.body;
    const userinput = query;
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `Refine a search query for better results, make sure to change it so that the results make more sense to the user, but keep it only a word or 2, return just the updated search query in quotes, no other text: "${userinput}"`}]
    });
    query =  chatCompletion.data.choices[0].message.content;
    const result = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        key: "AIzaSyB5ovc4GlyJNMbvzQGcXNme0JhGzAQWDW0",
        cx: "522e3ec0502e94ffe",
        q: query
      }
    });
    const responseObj = {
      data: result.data.items,
      query: query
    }

    res.status(200).json(responseObj);
  } catch (err) {
    console.error("[ERR] in searchGoogle", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
