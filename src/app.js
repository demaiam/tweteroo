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
	if (!username || !avatar || typeof(username) != "string" || typeof(avatar) != "string") {
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
    let aux = 10;
    if (tweetsArr.length < 10) {
    	aux = tweetsArr.length;
    }
    for (let i = tweetsArr.length; i > tweetsArr.length - aux; i--) {
        const tweetObj = {
            username: tweetsArr[i-1].username,
            avatar: usersArr.find(e => e.username === tweetsArr[i-1].username).avatar,
            tweet: tweetsArr[i-1].tweet
        };
        lastTweets.push(tweetObj);
    }
    res.send(lastTweets);
});

app.listen(5000);
