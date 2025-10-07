// server.js
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const path = require('path');

const SECRET = 'clave-pruebas';
const TOKEN_EXPIRES_IN = '2h';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Helpers
function signToken(user) {
    const payload = {
        sub: user.id,
        role: user.role,
        email: user.email
    };
    return jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPIRES_IN });
}

function authMiddleware(req, res, next) {
    const header = req.headers['authorization'] || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'NO_TOKEN' });

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // attach for next handlers
        next();
    } catch (err) {
        return res.status(401).json({ error: 'INVALID_TOKEN' });
    }
}

// ---- Endpoints custom de Auth ----

// Register
server.post('/api/auth/register', (req, res) => {
    const { name, email, password, role, phone } = req.body || {};
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'MISSING_FIELDS' });
    }
    const db = router.db;
    const existing = db.get('users').find({ email }).value();
    if (existing) {
        return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS' });
    }
    const id = `u_${Date.now()}`;
    const user = { id, name, email, password, role, phone: phone || null };
    db.get('users').push(user).write();

    const safeUser = { id, name, email, role, phone };
    return res.status(201).json(safeUser);
});


// Login
server.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: 'MISSING_FIELDS' });
    }
    const db = router.db;
    const user = db.get('users').find({ email }).value();
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    }
    const token = signToken(user);
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    return res.json({ accessToken: token, user: safeUser });
});

// Profile (protegido con Bearer token)
server.get('/api/auth/profile', authMiddleware, (req, res) => {
    const db = router.db;
    const user = db.get('users').find({ id: req.user.sub }).value();
    if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    return res.json(safeUser);
});

// ---- Rutas REST por defecto bajo /api ----
server.use('/api', router);

// Arranque
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Fake API running on http://localhost:${PORT}`);
});
