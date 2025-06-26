import { Link } from "./link";

export interface Tag {
    user_id: number,
    tagname: String,
    links_count: number,
    links: Link[]
}
