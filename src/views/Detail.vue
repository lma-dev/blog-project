<template>
  <div v-if="post" class="post">
    <img
      :src="'https://ui-avatars.com/api/?name=' + post.title + '&color=A2A2A2 '"
      alt="404error"
    /><br />
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <div class="layout-btn">
      <router-link :to="`/edit/${post.id}`">
        <button class="edit">修正</button>
      </router-link>
      <button class="delete" @click="deletePost">削除</button>
    </div>
  </div>
  <div v-else>
    <Spinner>Loading</Spinner>
  </div>
</template>

<script>
import Spinner from '../components/Spinner';
import getPost from '../composables/getPost';
import { db } from '../firebase/config';
import { useRouter } from 'vue-router';

export default {
  components: { Spinner },
  props: ['id'],
  setup(props) {
    let router = useRouter();
    let { post, error, load } = getPost(props.id); //{post,error,load}
    load();

    // delete post
    let deletePost = async () => {
      let id = props.id;
      await db.collection('posts').doc(id).delete();
      router.push({ name: 'Home' }); //return home page
    };

    return { post, error, deletePost };
  },
};
</script>

<style scoped>
.post {
  padding-bottom: 30px;
  max-width: 1500px;
  margin: 0 auto;
  padding: 10px;
  border-bottom: 1px dashed #e7e7e7;
}
.post h2 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  margin-bottom: 10px;
  max-width: 400px;
}
.post h2::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1deg);
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
</style>
