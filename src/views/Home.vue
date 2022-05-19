<template>
  <div class="home">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="posts.length > 0" class="layout">
      <div>
        <PostsList :posts="posts"></PostsList>
      </div>
      <div>
        <TagCloud :posts="posts"></TagCloud>
      </div>
    </div>
    <div v-else>
      <Spinner></Spinner>
      <p>Loading data .... Please keep your network connection</p>
    </div>
  </div>
</template>

<script>
import TagCloud from '../components/TagCloud';
import Spinner from '../components/Spinner';
import PostsList from '../components/PostsList';
import getPosts from '../composables/getPosts';

export default {
  components: {
    TagCloud,
    Spinner,
    PostsList,
  },
  setup() {
    let { posts, error, load } = getPosts();
    load();
    return { posts, error };
  },
};
</script>
