import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const tweetsArr = [];
const usersArr = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    
    if (!username || !avatar || typeof(username) != "string" || typeof(avatar) != "string") {
	   res.status(400).send("Todos os campos são obrigatórios!"); 
    }

    const user = {
        username: username,
        avatar: avatar
    };

    usersArr.push(user);
    res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
    let lastTenTweets = [];
    let aux = 0;
    if (tweetsArr.length >= 10) {
    	aux = 10;
    }
    for (let i = tweetsArr.length - 1; i > tweetsArr.length - 1 - aux; i--) {
        let tweetObj = {
            username: tweetsArr[i].username;,
            avatar: tweetsArr[i].tweet,
            tweet: usersArr.find(element => element.username === username).avatar
        };
        lastTenTweets.push(tweetObj);
    }
    res.status(200).send(lastTenTweets);
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
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

app.listen(5000);
