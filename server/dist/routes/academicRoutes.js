"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicController_1 = require("../controllers/academicController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticateToken, academicController_1.getAcademicEvents);
router.post('/', auth_1.authenticateToken, academicController_1.createAcademicEvent);
exports.default = router;
//# sourceMappingURL=academicRoutes.js.map