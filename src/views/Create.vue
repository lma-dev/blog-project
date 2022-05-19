<template>
  <div>
    <form @submit.prevent="validate">
      <FormMessage :message="message" :errors="errors"></FormMessage>
      <span class="title-design">Create Form</span><br />
      <label>タイトル</label>
      <input type="text" v-model="title" />
      <label>コンテンツ</label>
      <textarea v-model="body"></textarea>
      <label>タグ(タグを追加するために入力してください)</label>
      <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown" />
      <div class="tag-design" v-for="(tag, index) in tags" :key="tag">
        <button @click="removeTag(index)">{{ tag }}</button>
      </div>
      <button>記入</button>
    </form>
  </div>
</template>

<script>
import FormMessage from '../components/FormMessage';
import { ref } from 'vue';
import { db, timestamp } from '../firebase/config';
import validateForm from '../composables/validateForm';

export default {
  components: {
    FormMessage,
  },
  setup() {
    let title = ref('');
    let body = ref('');
    let tag = ref('');
    let tags = ref([]);
    let message = ref('');
    let errors = ref([]);

    //delete same value when user insert
    let handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value);
      }
      tag.value = '';
    };

    let validate = () => {
      errors.value = []; //reset Error Message
      message.value = ''; //reset  Message
      let { errorsCheck } = validateForm(title.value, body.value, tags.value);

      if (!errorsCheck.value.length) {
        // tag.value = tagsCheck.value;
        // tags.value.push(tag.value);
        // tags.value = tags.value.filter(function (el) {
        //   return el != null;
        // }); // Filter empty array element

        addPost(); // add new post
      } else {
        errors.value = [...errorsCheck.value];
        return;
      }
    };

    // Create new Post
    let addPost = async () => {
      let newPost = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        created_at: timestamp(),
      };

      try {
        await db.collection('posts').add(newPost);
        errors.value = '';
        message.value = 'Successfully created';
        title.value = '';
        body.value = '';
        tags.value = '';
        tag.value = '';
      } catch (err) {
        errors.value.push(err.message);
      } // create post
    };

    // remove tag when user insert wrong tag
    let removeTag = (index) => {
      tags.value.splice(index, 1);
    };

    return {
      title,
      body,
      tag,
      tags,
      validate,
      handleKeydown,
      addPost,
      removeTag,
      errors,
      message,
    };
  },
};
</script>

<style></style>
