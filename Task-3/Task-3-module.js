import { tweets } from "./Task-3-data.js";

export let module = (function() {
    let user = 'Petia';

    function getUser() {
        return user;
    }

    function getTweet(id) {
        if(typeof id !== 'string') {
            console.log('invalid id');
        }
        const tweet = tweets.find((e) => e.id === id);
        return tweet ? tweet : {error : 'id isnt exist'};
    }

    function validateTweet(tw) {
        if (!(tw instanceof Object) || tw.constructor !== Object ) {
            return false;
        }        
        const obligatoryKeys = ['id', 'text', 'createdAt', 'author', 'comments'];
        const twKeys = Object.keys(tw);
        for (let i = 0; i < obligatoryKeys.length; i++) {
            if (!twKeys.includes(obligatoryKeys[i])) {
                return false
            }
        }
        return true;
    }

    function addTweet(text) {
        if (typeof text !== 'string' || text.length >= 280) {
            return false;
        } 
        const newTweet = {
            id: Number(new Date()),
            text: text,
            createdAt: new Date().toISOString(),
            author: user,
            comments: []
        }
        tweets.push(newTweet);
        return true;
    }

    function editTweet(id, text) {
        const tweet = tweets.find((e) => e.id === id);
        if (typeof text !== 'string' || text.length >= 280 || !tweet) {
            return false;
        } 
        tweet.text = text;
        return true;
    }

    function changeUser(newUser) {
        if (typeof newUser !== 'string' || newUser.length < 4) {
            return false;
        }
        user = newUser;
        return true;
    }

    function getTweets(skip = 0, top = 10, filterConfig = {}) {
        let tweetsCopy = [...tweets];
        if (filterConfig.author) {
            tweetsCopy = tweetsCopy.filter((element) => {
                if (filterConfig.author && filterConfig.author === element.author && filterConfig.author.length !== 0) {
                    return element;
                }
            });
        }
        if (filterConfig.text) {
            tweetsCopy = tweetsCopy.filter((element) => {
                if (element.text.indexOf(filterConfig.text) !== -1) {
                    return element;
                }
            });
        }
        if (filterConfig.hashtags && filterConfig.hashtags.length !== 0) {
            for(let i = 0; i < filterConfig.hashtags.length; i++) {
                tweetsCopy = tweetsCopy.filter((tweet) => {
                    if (tweet.text.indexOf(`${filterConfig.hashtags[i]}`) > 0) {
                        return tweet;
                    }
                });
            }
        }
        if (filterConfig.dateFrom || filterConfig.dateTo) {
            tweetsCopy = tweetsCopy.filter((tweet) => {
                console.log(+filterConfig.dateFrom);
            });
        }

        tweetsCopy = [...tweetsCopy];
        return tweetsCopy.slice(skip, top + skip);
    }

    function addComment(id, text) {
        if (typeof id !== 'string' || text.length === 0 || typeof text !== 'string') {
            return false;
        }
        const tweet = tweets.find((e) => e.id = id);
        if (!tweet) {
            return false;
        }
        tweet.comments.push({
            id: tweet.comments.length,
            text: text,
            createdAt: new Date(),
            author: user
        }); 
        return true;
    }

    function validateComment(com) {
        if (!(com instanceof Object) || com.constructor !== Object ) {
            return false;
        }  
        const obligatoryKeys = ['id', 'text', 'createdAt', 'author'];
        const comKeys = Object.keys(com);
        for(let i = 0; i < obligatoryKeys.length; i++) {
            if (!comKeys.includes(obligatoryKeys[i]) || typeof com[obligatoryKeys[i]] !== 'string') {
                return false;
            }
        }
        return true;
    }
    
    function removeTweet(id) {
        const tweet = tweets.find((e) => e.id = id);
        if (!tweet) {
            return false;
        }
        tweets.splice(tweets.indexOf(tweet), 1);
        console.log(tweets);
        return true;
    }
    
    // console.log(validateComment({id: '1', text: 'string', createdAt: new Date().toISOString(), author: 'vlad'}));
    // console.log(removeTweet('1'));
    // console.log(removeTweet('15'));
    // console.log(tweets[0]);
    // console.log(addComment(tweets[0].id, 'string'));
    // console.log(tweets[0]);
    // console.log(changeUser('maik'));
    // console.log(editTweet('2', 'Вафли бывают красные'));
    // console.log(addTweet('ssssssss'));
    // console.log(validateTweet(tweets[0]));
    // console.log(getTweet('5'));
    console.log(getTweets(0, 10, {hashtags: ['datamola'], dateFrom: new Date().toISOString()}));
}());