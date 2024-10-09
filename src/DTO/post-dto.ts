export interface PostDTO {
    content?: string
    image?: string
    authorID: number
}

export interface UpdatePostDTO extends PostDTO {
    id: number
}