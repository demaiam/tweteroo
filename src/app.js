import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const tweetsArr = [];
const usersArr = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    const user = {
        username: username,
        avatar: avatar
    };

    usersArr.push(user);
    res.send("OK");
});

app.get("/tweets", (req, res) => {
    let lastTenTweets = [];
    for (let i = tweetsArr.length; i > tweetsArr.length - 10; i--) {
        let username = tweetsArr[i].username;
        let tweet = tweetsArr[i].tweet;
        let avatar = usersArr.find(element => element.username === username).avatar;
        let tweetObj = {
            username: username,
            avatar: avatar,
            tweet: tweet
        };
        lastTenTweets.push(tweetObj);
    }
    res.send(lastTenTweets);
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
    res.send("OK");
});

app.listen(5000);