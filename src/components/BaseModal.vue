<template>
  <transition name="modal-fade">
    <div class="overlay" @click.stop>
      <div class="modal">
        <h2>Deseja apagar a tarefa?</h2>
      </div>
      <div class="button-group">
        <BaseButtonVue label="Apagar" @click-event="$emit('delete-task')" />
        <BaseButtonVue label="Cancelar" @click-event="$emit('close-modal')" />
      </div>
    </div>
  </transition>
</template>
<script>
import BaseButtonVue from "./BaseButton.vue";
export default {
  name: "BaseModal",
  components: { BaseButtonVue },
};
</script>
<style lang="scss">
.overlay {
  position: absolute;
  top: 20%;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #961ef4;
  border-radius: 20px;
  margin-left: 5%;

  .modal {
    text-align: center;
  }

  .button-group {
    display: flex;
    justify-content: space-evenly;
  }
}

button {
  cursor: pointer;
}
</style>
