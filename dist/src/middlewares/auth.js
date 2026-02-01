import { auth as betterAuth } from "../lib/auth";
export var TutorRole;
(function (TutorRole) {
    TutorRole["USER"] = "STUDENT";
    TutorRole["TUTOR"] = "TUTOR";
    TutorRole["ADMIN"] = "ADMIN";
})(TutorRole || (TutorRole = {}));
const auth = (...roles) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization header:", authHeader);
        const session = await betterAuth.api.getSession({
            headers: req.headers
        });
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized"
            });
        }
        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: session.user.role
        };
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden! You don't have permission to access this resource!"
            });
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export default auth;
//# sourceMappingURL=auth.js.map