"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouters = void 0;
const express_1 = require("express");
const multer_config_1 = require("../../config/multer.config");
const parseBody_1 = require("../../middleware/parseBody");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const router = (0, express_1.Router)();
router.post("/create-project", multer_config_1.multerUpload.single("image"), parseBody_1.parseBody, (0, validateRequest_1.default)(project_validation_1.projectValidations.projectValidationSchema), project_controller_1.projectController.createProject);
router.put("/update-project/:id", multer_config_1.multerUpload.single("image"), parseBody_1.parseBody, (0, validateRequest_1.default)(project_validation_1.projectValidations.updateProjectValidationSchema), project_controller_1.projectController.updateProject);
router.delete("/:id", project_controller_1.projectController.deleteProject);
router.put("/status/:id", project_controller_1.projectController.partialUpdateProject);
router.get("/", project_controller_1.projectController.getProject);
router.get("/my-project/:id", project_controller_1.projectController.getProject);
exports.projectRouters = router;
