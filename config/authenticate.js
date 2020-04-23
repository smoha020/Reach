module.exports = {
    authenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/login');
    },
    
    notAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/dashboard');
        }
        return next();
    }
    
}

