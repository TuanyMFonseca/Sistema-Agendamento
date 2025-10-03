const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ error: 'Acesso negado. Usuário não autenticado ou role não definida.' });
        }
        const userRole = req.user.role;
        if (userRole !== requiredRole) {
            return res.status(403).json({ error: `Acesso negado. Requer a role: ${requiredRole}.` });
        }

        next();
    };
};

module.exports = roleMiddleware;
