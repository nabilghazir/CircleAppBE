export interface RepliesDTO {
    image?: string;
    content?: string;
    // likescount?: number;
    // repliescount?: number;
    postID: number;
}

export interface UpdateRepliesDTO extends RepliesDTO {
    id: number;
}