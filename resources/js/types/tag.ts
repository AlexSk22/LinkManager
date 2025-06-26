import { Link } from "./link";

export interface Tag {
    user_id: number,
    tagname: string,
    links_count: number,
    links: Link[]
}
