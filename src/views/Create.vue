<template>
  <form @submit.prevent="addPost">
    <label>Title</label>
    <input type="text" required v-model="title" />
    <label>Body</label>
    <textarea required v-model="body"></textarea>
    <label>Tag(hit enter to add a tag)</label>
    <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown" />
    <div class="pill" v-for="tag in tags" :key="tag">
      {{ tag }}
    </div>
    <button>add post</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';

export default {
  setup() {
    let title = ref('');
    let body = ref('');
    let tag = ref('');
    let tags = ref([]);

    let handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value);
      }
      tag.value = '';
    };

    let addPost = async () => {
      await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: title.value,
          body: body.value,
          tags: tags.value,
        }),
      });
    };

    return { title, body, tag, tags, handleKeydown, addPost };
  },
};
</script>

<style>
form {
  max-width: 450px;
  text-align: left;
  margin: 40px auto;
}
label {
  display: inline-block;
  padding: 20px 0 20px 0;
  color: rgb(110, 109, 109);
  font-size: 15px;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
}
input,
textarea {
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 10px;
}
button {
  display: block;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  background-color: crimson;
  color: white;
  margin-top: 20px;
}
.pill {
  margin: 10px 10px 0 0;
  padding: 8px;
  color: #444;
  background: #ddd;
  border-radius: 20px;
  display: inline-block;
}
</style>
