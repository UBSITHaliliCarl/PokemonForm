const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://new-user:SsnZQVFWl870DcwM@pokemondb.rbpley3.mongodb.net/?appName=PokemonDB');

const Pokemon = mongoose.model ('Pokemon', {
    name:String,
    type:String,
    level:Number,
    nature:String
})

app.post('/api/pokemon', async (req, res) => {
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.status(201).send(pokemon); console.log("Added new pokemon: ", pokemon);
});

app.get('/api/pokemon', async(req, res) => {
    const list = await Pokemon.find();
    res.send(list); console.log("Fetched all pokemon")
});

app.listen(3000, () => console.log('API is running on port 3000'));