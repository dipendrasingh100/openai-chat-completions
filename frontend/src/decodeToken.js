
const decodeToken = () => {
    const token = localStorage.getItem("ctoken")
    if (token) {
        try {
            const payload = token.split(".")[1]
            let decrypt = window.atob(payload)
            decrypt = JSON.parse(decrypt)
            const date = new Date()
            const currTime = Math.round(date.getTime() / 1000)
            const expTime = decrypt.exp
            if (currTime > expTime) {
                return { loggedin: 0 }
            }
            return { loggedin: 1, userid: decrypt?.userid, aoi: decrypt?.aoi }

        } catch {
            return { loggedin: 0 }
        }
    } else {
        return { loggedin: 0 }
    }
}

export default decodeToken
