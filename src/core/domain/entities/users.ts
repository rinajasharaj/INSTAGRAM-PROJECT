export default class User{
    constructor(
        public user_id: number,
        public username: string,
        public profile_picture: string,
        public profile_name: string,
        public profile_desc: string){
            this.user_id = user_id;
            this.username = username;
            this.profile_picture = profile_picture;
            this.profile_name = profile_name;
            this.profile_desc = profile_desc;
        }
}