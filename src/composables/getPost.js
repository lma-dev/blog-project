import {
    ref
} from "vue";
import {
    db
} from "../firebase/config"
let getPost = (id) => {
    let post = ref(null);
    let error = ref("");

    let load = async () => {
        try {
            // take realtime data from firebase
            // let doc = await db.collection("posts").doc(id).get()
            // // fix post data to add id number
            // post.value = {
            //     id: doc.id,
            //     ...doc.data()
            // }

            // take realtime data from firebase
            await db.collection("posts").doc(id).onSnapshot((snap) => {
                // fix post data to add id number
                post.value = {
                    id: snap.id,
                    ...snap.data()
                }
            })

        } catch (err) {
            error.value = err.message;
        }
    }
    return {
        post,
        error,
        load
    };
}

export default getPost;