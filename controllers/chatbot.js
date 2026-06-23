const Groq = require("groq-sdk");
const Listing = require("../models/listing.js");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chat = async (req, res) => {
  try {
    const userQuery = req.body.query;

    if (!userQuery) {
      return res.status(400).json({ error: "Query missing" });
    }

    const listings = await Listing.find({}).limit(50);

    const context = listings
      .map(
        (l) => `Title: ${l.title}, Price: ${l.price}, Location: ${l.location}
                Description : ${l.description}, Country : ${l.country}, Category : ${l.category}`,
      )
      .join("\n");

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are Wanderlust AI assistant.
Answer ONLY using the provided listings data.
If not found, say "Not available in listings".

Listings:
${context}
          `,
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
      max_tokens: 120,
      temperature: 0.3,
    });

    res.json({
      answer: completion.choices[0].message.content,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Chat failed" });
  }
};
