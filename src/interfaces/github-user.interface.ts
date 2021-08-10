import { Item } from './Item.interfaces';

export interface GithubUser {
    total_count:        number;
    incomplete_results: boolean;
    items:              Item[];
}