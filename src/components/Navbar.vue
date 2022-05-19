<template>
  <header>
    <h1>Writer Paradise</h1>
    <nav>
      <router-link :to="{ name: 'Home' }">ホームページ</router-link>
      <router-link :to="{ name: 'Create' }">作成</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1500px;
}
header h1 {
  color: #bbb8b8;
  font-size: 48px;
}
header a {
  color: #bbb;
  text-decoration: none;
  margin-left: 20px;
}
header a {
  text-decoration: none;
  margin: 10px;
  font-weight: bold;
  color: rgb(143, 138, 138);
}

header a.router-link-active {
  padding: 5px;
  color: crimson;
}

header a:hover {
  color: blue;
  border-bottom: 3px solid green;
}
</style>
