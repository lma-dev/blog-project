<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="filterPosts.length" class="layout">
      <div>
        <PostsList :posts="filterPosts"></PostsList>
      </div>
      <div>
        <TagCloud :posts="posts"></TagCloud>
      </div>
    </div>
    <div v-else><Spinner></Spinner></div>
  </div>
</template>

<script>
import Spinner from '../components/Spinner';
import TagCloud from '../components/TagCloud';
import PostsList from '../components/PostsList';
import { computed } from '@vue/runtime-core';
import getPosts from '../composables/getPosts';
export default {
  components: {
    Spinner,
    TagCloud,
    PostsList,
  },
  props: ['tag'],
  setup(props) {
    let { posts, error, load } = getPosts();
    load();
    let filterPosts = computed(() => {
      return posts.value.filter((post) => {
        return post.tags.includes(props.tag);
      });
    });
    return { posts, filterPosts, error };
  },
};
</script>

<style>
.tag {
  max-width: 1500px;
  margin: 0 auto;
  padding: 10px;
}
</style>
