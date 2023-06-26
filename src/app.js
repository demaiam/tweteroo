import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const usersArr = [];
const tweetsArr = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (!username || !avatar || typeof(username) != "string" || typeof(avatar) != "string") {
	   res.status(400).send("Todos os campos são obrigatórios!"); 
	   return;
    }
    const user = {
        username: username,
        avatar: avatar
    };
    usersArr.push(user);
    res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
	if (!username || !tweet || typeof(username) != "string" || typeof(tweet) != "string") {
		res.status(400).send("Todos os campos são obrigatórios!"); 
		return;
	}
    if (!usersArr.includes(username)) {
        res.send("UNAUTHORIZED");
        return;
    }
    const newTweet = {
        username: username,
        tweet: tweet
    }
    tweetsArr.push(newTweet);
    res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
    let lastTweets = [];
    for (let i = 0; i < tweetsArr.length - aux; i++) {
        const tweetObj = {
            username: tweetsArr[i].username,
            avatar: usersArr.find(e => e.username === tweetsArr[i].username).avatar,
            tweet: tweetsArr[i].tweet
        };
        lastTweets.push(tweetObj);
    }
    res.send(lastTweets.slice(-10, lastTweets.length));
});

app.listen(5000);
