import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { blogRouters } from "../modules/Blogs/blog.routes";
import { experienceRouters } from "../modules/Experiences/experience.routes";
import { userOpinionRoutes } from "../modules/ProjectComments/comments.routes";
import { projectRouters } from "../modules/Projects/project.routes";
import { skillRouters } from "../modules/Skills/skill.routes";
import { userRoutes } from "../modules/user/user.routes";

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
  {
    path: "/user-opinion",
    route: userOpinionRoutes,
  },
];

appRoutes.forEach((aRoute) => {
  router.use(aRoute.path, aRoute.route);
});

export default router;
