

async function httpGetTest(req,res){
    try{
        return res.json({response:"Hello"})
    }catch(e){
        console.error(e)
    }
}

module.exports = {
    httpGetTest
}