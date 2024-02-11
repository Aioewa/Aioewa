export async function onTab({addon, console}) {
    await new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log("10 seconds")
            resolve(true)
        }, 10000)
    })
}

