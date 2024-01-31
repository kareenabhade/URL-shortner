const URL = require("../models/url");
const shortid = require("shortid");

async function handleCreateShortURL(req,res){
    const body = req.body;
    if(!body) return res.status(400).json({error:"url is required"});
    const shortId = shortid();

    URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[],
    })  
    return res.json({id:shortId});
}

async function handleGetShortURL(req,res){
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL);
}

async function handleAnalytics(req,res){
    const shortId = req.params.id;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,
                    analytics:result.visitHistory});
}

module.exports = {
    handleCreateShortURL,
    handleGetShortURL,
    handleAnalytics,
}