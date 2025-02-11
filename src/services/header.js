const tokens = [

]

export default {
    getToken(url = "") {
        let tempToken = window.sessionStorage.getItem('token');
        for (const key in tokens)
            if (url.indexOf(tokens[key].url) !== -1) {
                tempToken = tokens[key].token;
                break;
            }
        return tempToken;
    }
}