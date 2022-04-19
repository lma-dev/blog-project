<template>
  <div class="tag-cloud">
    <h3>Tag Cloud</h3>
    <div v-for="tag in uniqueTags" :key="tag">
      <router-link :to="{ name: 'Tag', params: { tag: tag } }">
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: ['posts'],
  setup(props) {
    let tags = ref([]);
    props.posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tags.value.push(tag);
      });
    });
    let uniqueTags = tags.value.filter((tag, index, array) => {
      return array.indexOf(tag) === index;
    });
    return { uniqueTags };
  },
};
</script>

<style>
.tag-cloud {
  padding: 10px;
}
.tag-cloud h3 {
  border-bottom: 1px dotted #bbb;
  padding: 16px 8px;
}

.tag-cloud a {
  text-decoration: none;
  font-weight: bold;
  color: rgb(145, 143, 143);
}

.tag-cloud a:hover {
  color: rgb(62, 62, 180);
}

.tag-cloud a.router-link-active {
  color: #ff8800;
}

.tag-cloud div {
  display: inline-block;
  padding: 10px;
}
</style>
