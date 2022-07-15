import { validationResult } from "express-validator";
import { Response } from "../util/response";
import { tryCatch } from "../util/tryCatch";
import { StoryManager } from "../action/story-action";

export class Stories {
  static postAddStory = async (req: any, res: any) => {
    const { title, story, tag, isPublic, imageUrl } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return Response.error(errors.array()[0].msg, 500, res);
    }

    const [error, addStory] = await tryCatch(
      StoryManager.createStory,
      title,
      story,
      tag,
      imageUrl,
      isPublic,
      req.userId
    );
    if (error) {
      return Response.error(error.message, 500, res);
    }
    Response.success("Story Added Successfuly", 300, addStory, res);
  };

  static getStories = async (req: any, res: any) => {
    const [error, stories] = await tryCatch(StoryManager.getStories);

    if (error) {
      return Response.error(error.message, 404, res);
    }

    Response.success("Stories Found", 300, stories, res);
  };

  static getStory = async (req: any, res: any) => {
    const { storyId } = req.params;
    const [error, story] = await tryCatch(StoryManager.getStory, storyId);
    if (error) {
      return Response.error(error.message, 300, res);
    }

    Response.success("Story Details", 200, story, res);
  };

  static getStoryDetails = async (req: any, res: any, next: any) => {
    const storyId = req.params.storyId;

    const [error, story] = await tryCatch(
      StoryManager.getStoryDetails,
      storyId
    );

    if (error) {
      return Response.error(error.message, 500, res);
    }

    Response.success("Story Details", 300, story, res);
  };

  static getUserStories = async (req: any, res: any) => {
    const { userId } = req.params;
    const [error, stories] = await tryCatch(
      StoryManager.getUserStories,
      userId
    );
    if (error) {
      return Response.error("No Stories found for the user", 300, res);
    }
    Response.success("User Stories", 300, stories, res);
  };

  static postEditStory = async (req: any, res: any) => {
    const { title, story, tag, isPublic } = req.body;
    const { storyId } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Response.error("Invalid inputs", 500, res);
    }

    const [error, editedStory] = await tryCatch(
      StoryManager.editStory,
      title,
      story,
      tag,
      isPublic,
      storyId,
      req.userId
    );

    if (error) {
      return Response.error(error.message, 300, res);
    }

    Response.success("Story edited", 200, editedStory, res);
  };

  static deleteStory = async (req: any, res: any) => {
    const { storyId } = req.params;

    const [deleteError, deletedResult] = await tryCatch(
      StoryManager.deleteStory,
      storyId,
      req.userId
    );
    // console.log(req.userId);

    if (deleteError) {
      console.log(deleteError);
      return Response.error(deleteError.message, 300, res);
    }

    Response.success("Story Deleted", 400, deletedResult, res);
  };
}
