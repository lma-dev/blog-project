<template>
  <form @submit.prevent="validate">
    <FormMessage :message="message" :errors="errors"></FormMessage>
    <span class="title-design">Edit Form</span><br />
    <label>タイトル</label>
    <input type="text" v-model="title" />
    <label>コンテンツ</label>
    <textarea v-model="body"></textarea>
    <label>タグ(タグを追加するために入力してください)</label>
    <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown" />
    <div class="tag-design" v-for="(tag, index) in tags" :key="tag">
      <button @click="removeTag(index)">{{ tag }}</button>
    </div>
    <button>更新</button>
  </form>
</template>

<script>
import FormMessage from '../components/FormMessage';
import { ref, onMounted } from 'vue';
import { db, timestamp } from '../firebase/config';
import validateForm from '../composables/validateForm';

export default {
  components: { FormMessage },
  props: ['id'],
  setup(props) {
    let title = ref('');
    let body = ref('');
    let tag = ref('');
    let tags = ref([]);
    let errors = ref('');
    let message = ref('');
    let post = ref(null);

    onMounted(async () => {
      let doc = await db.collection('posts').doc(props.id).get();
      // add data in form to edit
      post.value = {
        id: doc.id,
        ...doc.data(),
      };

      title.value = post.value.title;
      body.value = post.value.body;
      tags.value = post.value.tags;
    });

    //delete same value when user insert
    let handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value);
      }
      tag.value = '';
    };

    let removeTag = (index) => {
      tags.value.splice(index, 1);
    };

    let validate = () => {
      errors.value = []; //reset Error Message
      message.value = ''; //reset  Message
      let { errorsCheck } = validateForm(title.value, body.value, tags.value);

      if (!errorsCheck.value.length) {
        edit(); // edit post
      } else {
        errors.value = [...errorsCheck.value];
        return;
      }
    };

    // Edit post
    let edit = async () => {
      let updatePost = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        created_at: timestamp(),
      };
      try {
        await db.collection('posts').doc(props.id).update(updatePost);
        message.value = 'Successfully Edited';
      } catch (err) {
        errors.value.push(err.message);
      }
    };

    return {
      title,
      body,
      tags,
      tag,
      edit,
      errors,
      validate,
      message,
      handleKeydown,
      removeTag,
    };
  },
};
</script>
