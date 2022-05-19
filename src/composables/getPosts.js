import {
    ref
} from "vue";
import {
    db

} from "../firebase/config"
let getPosts = () => {
    let posts = ref([]);
    let error = ref("");
    let load = async () => {
        try {
            // take realtime data from firebase
            db.collection("posts").orderBy("created_at", "desc").onSnapshot((snap) => {
                // fix post data to add id number
                posts.value = snap.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
            })
        } catch (err) {
            error.value = err.message;
        }
    }
    return {
        posts,
        error,
        load
    };
}
export default getPosts;