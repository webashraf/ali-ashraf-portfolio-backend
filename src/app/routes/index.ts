import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { blogRouters } from "../modules/blogs/blog.routes";
import { experienceRouters } from "../modules/experiences/experience.routes";
import { projectRouters } from "../modules/projects/project.routes";
import { skillRouters } from "../modules/skills/skill.routes";
import { userRoutes } from "../modules/users/user.routes";

const router = Router();

const appRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },

  {
    path: "/auth",
    route: authRoutes,
  },

  {
    path: "/skill",
    route: skillRouters,
  },
  {
    path: "/experience",
    route: experienceRouters,
  },
  {
    path: "/blog",
    route: blogRouters,
  },
  {
    path: "/project",
    route: projectRouters,
  },
];

appRoutes.forEach((aRoute) => {
  router.use(aRoute.path, aRoute.route);
});

export default router;
