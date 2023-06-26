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
    let lastTweets = [];
    let aux = 10;
    if (tweetsArr.length <= 10) {
    	aux = tweetsArr.length;
    }
    for (let i = tweetsArr.length - aux; i < tweetsArr.length; i++) {
        let tweetObj = {
            username: tweetsArr[i].username,
            avatar: usersArr.find(element => element.username === tweetsArr[i].username).avatar,
            tweet: tweetsArr[i].tweet
        };
        lastTweets.push(tweetObj);
    }
    res.status(200).send(lastTweets);
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if (!usersArr.includes(username)) {
        res.send("UNAUTHORIZED");
        return;
    }
    let newTweet = {
        username: username,
        tweet: tweet
    }
    tweetsArr.push(newTweet);
    res.status(201).send("OK");
});

app.listen(5000);
