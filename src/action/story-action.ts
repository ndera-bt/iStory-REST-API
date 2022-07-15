import { Story } from "../model/story";
import { Tag } from "../model/tags";
import { User } from "../model/user";

export class StoryManager {
  static async createStory(
    title: string,
    story: string,
    tag: string,
    imageUrl: string,
    status: boolean,
    userId: string
  ) {
    const user = await User.findOneBy({ id: userId });

    const addStory = Story.create({
      title,
      body: story,
      imageUrl,
      isPublic: status,
    });

    if (user) {
      addStory.user = user;
    }

    await addStory.save();

    const tags = tag.split(",").map((tag) => "#" + tag);

    const existingTags = await Tag.createQueryBuilder("tag")
      .where("tag.tag IN (:...tags)", { tags: tags })
      .getMany();

    const checkedExist = existingTags.map((tag) => {
      return tag.tag;
    });

    const newTags = tags.filter((tag) => !checkedExist.includes(tag));

    if (existingTags.length > 0) {
      addStory.tags = existingTags;
      addStory.save();
    }

    if (newTags.length > 0) {
      const addTag = newTags.forEach(async (tag) => {
        const newTag = Tag.create({ tag });
        newTag.stories = [addStory];
        await newTag.save();
      });
    }

    if (!addStory) {
      throw new Error("Unable to Add Story");
    }

    return addStory;
  }

  static async getStory(storyId: string) {
    const story = await Story.createQueryBuilder("story")
      .leftJoinAndSelect("story.tags", "tags")
      .where("story.id = :storyId", { storyId: storyId })
      .getOne();

    if (!story) {
      throw new Error("Story Not found");
    }

    return story;
  }

  static async getStories() {
    const stories = await Story.createQueryBuilder("story")
      .leftJoinAndSelect("story.tags", "tags")
      .where("story.isPublic = :isPublic", { isPublic: true })
      .orderBy("story.created_at", "DESC")
      .getMany();

    if (!stories) {
      throw new Error("No stories found");
    }
    return stories;
  }

  static async getStoryDetails(storyId: string) {
    const story = await Story.findOneBy({ id: storyId });
    return story;
  }

  static async getUserStories(userId: string) {
    const stories = await Story.createQueryBuilder("story")
      .leftJoinAndSelect("story.tags", "tags")
      .where("story.userId = :id", { id: userId })
      .orderBy("story.created_at", "DESC")
      .getMany();

    if (!stories) {
      return new Error("Stories not found");
    }
    return stories;
  }

  static async editStory(
    title: string,
    story: string,
    tag: string,
    isPublic: boolean,
    storyId: string,
    userId: string
  ) {
    const getStory = await Story.findOneBy({ id: storyId });

    if (!getStory) {
      return new Error("Story not found");
    }

    if (getStory.user.id !== userId) {
      throw new Error("Not Authorized");
    }

    getStory.title = title;
    getStory.body = story;
    if (isPublic) {
      getStory.isPublic = isPublic;
    }
    await getStory.save();

    const tags = tag.split(",").map((tag) => "#" + tag);

    const getExistingTags = await Tag.createQueryBuilder("tag")
      .where("tag.tag IN (:...tags)", { tags: tags })
      .getMany();

    const getTags = getExistingTags.map((tag) => {
      return tag.tag;
    });

    const getNew = tags.filter((tag) => !getTags.includes(tag));

    if (getExistingTags.length > 0) {
      getStory.tags = getExistingTags;
      getStory.save();
    }

    if (getNew.length > 0) {
      const addNew = getNew.forEach(async (tag) => {
        const newTag = Tag.create({ tag });
        newTag.stories = [getStory];
        await newTag.save();
      });
    }

    return getStory;
  }

  static async deleteStory(storyId: string, userId: string) {
    const story = await Story.findOneBy({ id: storyId });

    if (!story) {
      return new Error("Story no longer exist");
    }

    if (story.user.id !== userId) {
      throw new Error("Not Authorized");
    }

    const deleted = story.remove();

    return deleted;
  }
}
