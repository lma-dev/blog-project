<template>
  <div>
    <div class="error" v-if="errors">
      <div v-for="error in errors" :key="error">
        <div class="error-box">
          {{ error }}
        </div>
      </div>
    </div>
    <div class="success" v-if="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['errors', 'message'],
};
</script>

<style></style>
