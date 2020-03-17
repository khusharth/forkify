export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img ) {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;   
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        // If we get an id which is not -1 then we will return true
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }
}