import express from "express";
import { Stories } from "../controller/story";
import { isAuth } from "../middleware/isAuth";
import { body, check } from "express-validator";

const router = express.Router();

router.get("/", Stories.getStories);

router.get("/story/:storyId", Stories.getStory);

router.get("/user/stories/:userId", isAuth, Stories.getUserStories);

router.post(
  "/story/create",
  isAuth,
  [
    body("title", "invalid story title").trim().isLength({ min: 5 }),
    check("story", "invalid story body").trim().isLength({ min: 5 }),
    body("tag", "invalid story tag").isLength({ min: 2 }),
  ],
  Stories.postAddStory
);

router.post(
  "/story/update/:storyId",
  isAuth,
  [
    body("title", "invalid story title").trim().isLength({ min: 5 }),
    check("body", "invalid story body").trim().isLength({ min: 5 }),
    body("tag", "invalid story tag").isLength({ min: 2 }),
  ],
  Stories.postEditStory
);

router.delete("/story/:storyId", isAuth, Stories.deleteStory);

export const StoryRoutes = router;
