<template>
  <div class="container">
    <div class="todo-container">
      <div class="header">
        <h1 class="_white">To-do List</h1>
      </div>
      <div class="body">
        <div class="header">
          <div class="todo">
            <div class="title _white">To do</div>
            {{ todoScore }}
          </div>
          <div class="done">
            <div class="title _white">Done</div>
            {{ doneScore }}
          </div>
          <div class="total">
            <div class="title _white">Total</div>
            {{ totalScore }}
          </div>
        </div>
        <div class="new-task">
          <input
            v-model="currentTask"
            type="text"
            class="input-task"
            placeholder="Insert a new task"
          />
          <button
            :disabled="!enableButton"
            :class="{ disable: !enableButton }"
            type="button"
            class="new-task-button"
            @click="addTask"
          >
            New
          </button>
        </div>
        <div class="tasks">
          <ul>
            <li v-for="(task, index) in tasks" :key="task.title">
              <div class="option">
                <input
                  type="checkbox"
                  class="shrink"
                  :checked="task.done"
                  required
                  @click="changeTaskState(task)"
                />
                <p
                  class="title grow"
                  :class="{ checked: task.done }"
                  @click="changeTaskState(task)"
                >
                  {{ task.title }}
                </p>
                <BaseButtonVue
                  class="shrink"
                  label="Excluir"
                  @click-event="openModal(index)"
                />
              </div>
              <div>
                <p class="_info-text created-at">Data criação: {{ date }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="showModal" :class="{ 'disable-background': showModal }"></div>
    <Modal
      v-show="showModal"
      class="modal"
      @close-modal="showModal = false"
      @delete-task="deleteTask"
    />
  </div>
</template>

<script>
import Modal from "./BaseModal.vue";
import BaseButtonVue from "./BaseButton.vue";
export default {
  name: "TodoList",
  components: { Modal, BaseButtonVue },
  data() {
    return {
      currentTask: "",
      tasks: [],
      showModal: false,
      todoScore: 0,
      doneScore: 0,
      totalScore: 0,
      taskToDelete: null,
      isTaskDone: false,
      date: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    enableButton: function () {
      if (this.currentTask != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    /**
     * Open modal passing index
     * @param {number} index
     */
    openModal(index) {
      this.isTaskDone = this.tasks[index].done;
      this.taskToDelete = index;
      this.showModal = true;
    },

    /**
     * Change task status to DONE (when it is actually TO DO)
     * or to TO DO (when it is actually DONE) when click
     * @param {boolean} task
     */
    changeTaskState(task) {
      task.done = !task.done;

      if (this.todoScore > 0 && task.done == true) {
        this.todoScore--;
      }

      if (task.done == false) {
        this.todoScore++;
        this.doneScore--;
        return;
      }

      this.doneScore++;
    },

    /**
     * Add new task at list
     */
    addTask() {
      this.tasks.push({
        title: this.currentTask,
        done: false,
      });
      this.todoScore++;
      this.totalScore++;
      this.currentTask = "";
    },

    /**
     * Delete selected task
     */
    deleteTask() {
      if (!this.isTaskDone) {
        this.todoScore--;
      } else {
        this.doneScore--;
      }
      this.totalScore--;
      this.showModal = false;
      this.tasks.splice(this.taskToDelete, 1);
    },
  },
};
</script>
<style lang="scss">
._white {
  color: #fff;
}

._info-text {
  font-size: 10px;
  font-style: italic;
}
.title {
  border: none;
  border-radius: 5px 0 0 5px;
  width: 68px;
  margin-right: 8px;
}

.disable-background {
  opacity: 0.5;
  background: #000;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
}

.modal {
  z-index: 3;
}

.container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .todo-container {
    position: relative;
    width: 351px;
    z-index: 0;

    > .header {
      background-color: #961ef4;
      height: 70px;
      left: -5px;
      right: -5px;
      position: absolute;
      border-radius: 10px;
    }

    > .body {
      padding-top: 70px;
      border: 2px solid #961ef4;
      height: 500px;
      border-radius: 10px;
      overflow-y: auto;

      > .header {
        display: flex;
        justify-content: space-around;
        padding: 10px 0;

        > .todo {
          border: 1px solid #e35858;
          border-radius: 5px;
          padding-right: 10px;
          display: flex;
          align-items: center;

          > .title {
            background-color: #e35858;
            padding-top: 5px;
          }
        }

        > .done {
          border: 1px solid #00a78e;
          border-radius: 5px;
          padding-right: 10px;
          display: flex;
          align-items: center;

          > .title {
            background-color: #00a78e;
            padding-top: 5px;
          }
        }

        > .total {
          border: 1px solid #3a2a45;
          border-radius: 5px;
          padding-right: 10px;
          display: flex;
          align-items: center;

          > .title {
            background-color: #3a2a45;
            padding-top: 5px;
          }
        }
      }

      > .new-task {
        display: flex;
        justify-content: space-around;

        > .input-task {
          height: 31px;
          width: 190px;
          border: 1px solid #cdc7d1;
          border-radius: 5px;
          padding: 0px 10px;
        }

        > .new-task-button {
          background-color: #fff;
          height: 31px;
          width: 97px;
          border: 1px solid #961ef4;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;

          &.disable {
            background-color: gray;
            cursor: default;
            border: none;
            color: #fff;

            &:hover {
              background: gray;
            }
          }

          &:hover {
            background-color: #961ef4;
            color: #fff;
          }
        }
      }

      > .tasks {
        padding: 0 10px 0 8px;

        ul {
          list-style: none;
          padding: 0;

          li {
            display: flex;
            align-items: baseline;
            flex-direction: column;
            // border-bottom: 1px solid #961ef4;
            padding: 0 4px;

            &:hover {
              border-radius: 8px;
              background-color: #971ef43e;
            }

            .option {
              display: inline-flex;
              width: 100%;
              align-items: center;
              cursor: pointer;
            }

            .created-at {
              margin-top: 2px;
              padding-left: 15px;
            }

            .checked {
              text-decoration: line-through;
            }

            .grow {
              flex-grow: 1;
            }

            & .title {
              text-align: left;
              margin-bottom: 2px;
              margin-top: 4px;
            }

            .shrink {
              flex-shrink: 1;
            }
          }
        }
      }
    }
  }
}
</style>
