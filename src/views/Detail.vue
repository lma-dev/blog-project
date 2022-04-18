<template>
  <div v-if="post">
    Hello {{ id }}
    <h2>{{ post.title }}</h2>
    <h3>{{ post.body }}</h3>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import getPost from '../composables/getPost';
export default {
  props: ['id'],
  setup(props) {
    let { post, error, load } = getPost(props.id);
    load();
    return { post, error };
  },
};
</script>

<style></style>
