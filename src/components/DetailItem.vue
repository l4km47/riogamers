<template>
  <div class="item-list-one">
    <span>{{ name }}</span>
    <span class="description"
      ><strong>{{ description }}</strong></span
    >
  </div>
</template>
  
<script>
export default {
  props: {
    name: {
      type: Text,
      required: true,
    },
    description: {
      type: Text,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.item-list-one {
  background-color: rgba(0, 0, 0, 0.212);
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 3px;
  border-radius: 6px;
  flex: 1 auto;
}
.item-list-one:last-child {
  width: 100%;
}
li {
  list-style-type: none;
}
</style>