<template>
  <div>
    <button class="button" @click="$emit('click-event')">{{ label }}</button>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.button {
  background-color: #fff;
  height: 31px;
  width: 97px;
  border: 1px solid #961ef4;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;

  &:hover {
    background-color: #961ef4;
    color: #fff;
  }
}
</style>
