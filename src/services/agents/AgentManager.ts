import { instagramAgent } from "./InstagramAgent";

export class AgentManager {
  runInstagramAgent() {
    const story = instagramAgent.generateStory();
    const post = instagramAgent.generatePost();
    const caption = instagramAgent.generateCaption();
    const hashtags = instagramAgent.generateHashtags();

    return {
      story,
      post,
      caption,
      hashtags,
    };
  }
}

export const agentManager = new AgentManager();