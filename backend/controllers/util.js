

exports.removePlanFromUsers = function (users) {
    return new Promise(((resolve, reject) => {
        users.forEach((user) => {
            user.removePlan().then((resolve, reject)=>{
                if(reject) reject(reject);
            });
        })
        resolve();
    }))
}
