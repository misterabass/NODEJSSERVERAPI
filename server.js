const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();
app.use(bodyParser.json());

let jokes = [];

app.post('/', (req, res) => {
    const title = req.body.title;
    const comedian = req.body.comedian;
    const year = req.body.year;

    const joke = { title, comedian, year };

    jokes.push(joke);

    res.json(jokes);
});

app.get('/', (req, res) => {
    res.json(jokes);
});

app.patch('/joke/:id', (req, res) => {
    const id = req.params.id;

    const title = req.body.title;
    const comedian = req.body.comedian;
    const year = req.body.year;

    const jokeToUpdate = jokes.find(joke => joke.id === id);

    if (jokeToUpdate) {
        if (title) jokeToUpdate.title = title;
        if (comedian) jokeToUpdate.comedian = comedian;
        if (year) jokeToUpdate.year = year;

        res.json(jokeToUpdate);
    } else {
        res.status(404).json({ message: "Joke not found" });
    }
});

app.delete('/joke/:id', (req, res) => {
    const id = req.params.id;

    const jokeIndex = jokes.findIndex(joke => joke.id === id);

    if (jokeIndex !== -1) {
        const deletedJoke = jokes.splice(jokeIndex, 1)[0];
        res.json(deletedJoke);
    } else {
        res.status(404).json({ message: "Joke not found" });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
