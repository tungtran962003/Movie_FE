import Cookie from 'js-cookie'

const setCookie = (cookieName, jwt) => {
    removeCookie(cookieName)
    if (jwt) {
        return Cookie.set(cookieName, jwt, {
            expires: 1,
            secure: true,
            smaeSite: 'strict',
            path: '/',
        })
    }
}

const getCookie = (cookieName) => {
    return Cookie.get(cookieName)
}

const removeCookie = (cookieName) => {
    return cookieName ? Cookie.remove(cookieName) : null
}

export { setCookie, removeCookie, getCookie }