

const blocker = (req,res,next) => {
    let seconds = new Date().getSeconds();
    if(seconds % 2 !== 0){
        res.status('403').send('Balance is the key, making things even is the secret to success');
    }
    else{
        next();
    }
}

module.exports = blocker;