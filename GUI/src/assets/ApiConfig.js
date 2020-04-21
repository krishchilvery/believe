const prod = {

}

const dev = {
    url : {
        API_URL: 'http://localhost:8000',
        ACCESS_TOKEN_AGE: 3600,
        REFRESH_TOKEN_AGE: 18000
    }
}

export default process.env.NODE_ENV === 'development'? dev : prod;