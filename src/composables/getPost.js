import {
    ref
} from "vue";

let post = ref(null);
let error = ref('');
let getPost = (id) => {
    let load = async () => {
        try {
            let response = await fetch('http://localhost:3000/posts/' + id)
            if (response === 404) {
                throw new Error("URL not found");
            }
            let data = await response.json();
            post.value = data;
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