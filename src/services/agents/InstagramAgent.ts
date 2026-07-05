export class InstagramAgent {
  generateStory() {
    return {
      type: "Story",
      title: "Morning Coffee",
      status: "Ready",
    };
  }

  generatePost() {
    return {
      type: "Post",
      title: "Gym Motivation",
      status: "Ready",
    };
  }

  generateCaption() {
    return "Discipline beats motivation. 💪";
  }

  generateHashtags() {
    return [
      "#fitness",
      "#gym",
      "#motivation",
      "#aria",
      "#lifestyle",
    ];
  }
}

export const instagramAgent = new InstagramAgent();