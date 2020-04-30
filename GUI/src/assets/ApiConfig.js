const prod = {

}

const dev = {
    url : {
        API_URL: 'http://192.168.0.101:8000/api',
        ACCESS_TOKEN_AGE: 3600,
        REFRESH_TOKEN_AGE: 18000
    }
}

export default process.env.NODE_ENV === 'development'? dev : prod;