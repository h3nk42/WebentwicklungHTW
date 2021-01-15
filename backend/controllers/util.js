

exports.removePlanFromUsers = async function (users) {
    return new Promise(( async (resolve, reject) => {
        for (const user of users) {
            await user.removePlan().then((res,rej) => {
                if(rej) reject(rej);
            })
        }
        resolve(true);
    }))
}
