export const logout = () => {
    localStorage.removeItem('userAuth');
}

export const isLogin = () => {
    if (localStorage.getItem('userAuth')) {
        return true;
    }
    return false;
}