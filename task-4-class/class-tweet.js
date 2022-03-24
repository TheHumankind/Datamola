import { tweets } from "./Task-3-data.js";
export let module = (function() {
    class Tweet {

    id;
    createdAt;
    author; 
    text;
    comments;

    constructor(id, author, text) {
        this.id = id;
        this.author = author;
        this.text = text;
        this.comments = [];
        this.date = new Date();
        console.log(this.id);
    }

    static validate(tw) {
        const obligatoryKeys = ['id', 'text', 'createdAt', 'author', 'comments'];
        const twKeys = Object.keys(tw);
        for (let i = 0; i < obligatoryKeys.length; i++) {
            if (!twKeys.includes(obligatoryKeys[i])) {
                return false
            }
        }
        return true;
    }

    get id() {
        return this.id;
    }

    get date() {
        return this.date;
    }

    get author() {
        return this.author;
    }

    set id(id) {
        return id;
    }

    set date(date) {
        return date;
    }

    set author(author) {
        return author;
    }

}

class Comment {
    id;
    text;
    createdAt;
    author;

    constructor(id, text, createdAt, author) {

    }

    static validate(com) {
        const obligatoryKeys = ['id', 'text', 'createdAt', 'author'];
        const comKeys = Object.keys(com);
        for (let i = 0; i < obligatoryKeys.length; i++) {
            if (!comKeys.includes(obligatoryKeys[i])) {
                return false
            }
        }
        return true;
    }

    get id() {
        return this.id;
    }

    get date() {
        return this.date;
    }

    get author() {
        return this.author;
    }

    set id(id) {
        return id;
    }

    set date(date) {
        return date;
    }

    set author(author) {
        return author;
    }
}

class TweetCollection {

    #tws;

    constructor(tws) {
        this.#tws = tws;
    }

    getTweet(id) {
        if(typeof id !== 'string') {
            console.log('invalid id');
        }
        const tweet = this.#tws.find((e) => e.id === id);
        return tweet ? tweet : {error : 'id isnt exist'};
    }

    addTweet(text) {
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
        this.#tws.push(newTweet);
        return true;
    }

    editTweet(id, text) {
        const tweet = this.#tws.find((e) => e.id === id);
        if (typeof text !== 'string' || text.length >= 280 || !tweet) {
            return false;
        } 
        tweet.text = text;
        return true;
    }

    getPage (skip = 0, top = 10, filterConfig = {}) {
        let tweetsCopy = [...this.#tws];
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
        const dateFrom = filterConfig.dateFrom ? +filterConfig.dateFrom : +(new Date(0));
        const dateTo = +filterConfig.dateTo > +(new Date()) || !filterConfig.dateTo ? +(new Date()) : +filterConfig.dateTo;
        tweetsCopy = tweetsCopy.filter(tweet => {
            if (dateFrom < +tweet.createdAt && dateTo >= +tweet.createdAt) {
                return tweet;
            } 
        })
        tweetsCopy = [...tweetsCopy];
        return tweetsCopy.slice(skip, top + skip);
    }

    addAll(newTws) {
        const invalidArr = [];
        newTws.forEach(element => {
            if (Tweet.validate(element)) {
                this.#tws.push(element);
            } else {
                invalidArr.push(element);
            }
        });
        return invalidArr;
    }
    
    remove(id) {
        const tweet = this.#tws.find((e) => e.id = id);
        if (!tweet) {
            return false;
        }
        this.#tws.splice(tweets.indexOf(tweet), 1);
        return true;
    }

    clear() {
        this.#tws = [];
    }
}

const twsCollection = new TweetCollection(tweets);

console.log(twsCollection.getPage(0, 10));
twsCollection.clear();
console.log(twsCollection.getPage(0, 10));
}());
