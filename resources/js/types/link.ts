import { Tag } from "./tag";

export interface Link {
    id: number,
    name: string,
    link: string,
    tags: Tag[]
}
