export default class Post {
    constructor(
        public post_id: number,
        public user_id: number,
        public file_name: string,
        public post_desc: string
        ){
        this.post_id = post_id;
        this.user_id = user_id;
        this.file_name = file_name;
        this.post_desc = post_desc;
    }
}