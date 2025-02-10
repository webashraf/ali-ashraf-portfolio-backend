"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const blog_routes_1 = require("../modules/blogs/blog.routes");
const experience_routes_1 = require("../modules/experiences/experience.routes");
const project_routes_1 = require("../modules/projects/project.routes");
const skill_routes_1 = require("../modules/skills/skill.routes");
const user_routes_1 = require("../modules/users/user.routes");
const router = (0, express_1.Router)();
const appRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/skill",
        route: skill_routes_1.skillRouters,
    },
    {
        path: "/experience",
        route: experience_routes_1.experienceRouters,
    },
    {
        path: "/blog",
        route: blog_routes_1.blogRouters,
    },
    {
        path: "/project",
        route: project_routes_1.projectRouters,
    },
];
appRoutes.forEach((aRoute) => {
    router.use(aRoute.path, aRoute.route);
});
exports.default = router;
