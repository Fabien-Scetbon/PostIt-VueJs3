<template>
  <div class="container">
    <p class="info">Here, you can add a new Post-it.</p>
    <div class="note">
      <div class="alerte">{{ message }}</div>
      <div class="content">
        <form @submit.prevent="">
          <p class="title">Title</p>
          <input class="search" v-model="title" name="title" />
        </form>
        <form @submit.prevent="addNewTask">
          <!-- remplace prevent default pour ne pas rafraichir la page a l'input-->

          <p class="title">New task</p>
          <input class="search" v-model="newTask" name="newTask" />
          <button style="margin: 8px 0 0 3px; position: relative">
            <i
              class="fas fa-plus-circle"
              style="
                color: green;
                font-size: 2.5rem;
                margin: auto;
                position: absolute;
                top: -1.7rem;
                left: 5px;
              "
            ></i>
          </button>
        </form>
        <button v-if="tasks.length > 1" class="delete" @click="deleteAll">Delete all</button>
        <!-- comme v-on:click -->
        <ol>
          <li v-for="(task, index) in tasks" :key="task.id">
            <!-- v-bind remplacer par : -->
            <h3>{{ task }}</h3>
            <button @click="deleteTask(index)">
              <i class="fas fa-trash-alt" style="color: red"></i>
            </button>
          </li>
        </ol>
      </div>
      <div class="add-content">
        <button @click="goAdd()">
          <i
            class="fas fa-cloud-upload-alt"
            style="color: blue; margin: 8px; font-size: 2.5rem"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data() {
    return {
      title: '',
      tasks: [],
      newTask: '',
      message: '',
    }
  },

  methods: {
    addNewTask() {
      this.tasks.push(this.newTask)
      this.newTask = ''
    },

    deleteTask(index) {
      this.tasks.splice(index, 1)
    },

    deleteAll() {
      this.tasks = []
    },

    goAdd() {
      //console.log(this.tasks)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

      const url = `http://5.135.119.239:3090/notes/`
      

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: this.title, content: this.tasks }),
      }).then((res) => {
        if (res.ok) {
          this.message = "You've got a new Post-it !"
          setTimeout(() => {
            this.$router.push('/')
          }, 3000)
        } else {
          res.json().then((data) => {
            this.message = data.error.message
            console.log(this.message)
            setTimeout(() => {
              this.message = ' '
            }, 3000)
          })
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.alerte {
  width: auto;
  margin: auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: red;
}

.info {
  margin: 2rem;
  font-size: 2.5rem;
  color: white;
  font-weight: 800;
  text-shadow: -5px 6px 5px rgb(168, 160, 160);
}

.note {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 37rem;
  height: auto;
  padding: 3rem;
  margin: 1rem;
  border-radius: 0.5rem;
  background-color: rgb(240, 136, 136);
  background-image: linear-gradient(
    35deg,
    rgba(233, 233, 233, 0.01),
    rgba(240, 240, 240, 0.9)
  );
  box-shadow: -13px 20px 5px rgb(10, 10, 10);
}

.title {
  color: rgb(107, 44, 42);
  font-size: 1.5rem;
  font-weight: 800;
}

.search {
  background-color: transparent;
  border: 2px solid rgb(107, 44, 42);
  border-radius: 50px;
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  margin: 0.6rem 0;
  color: rgb(146, 43, 43);
  font-weight: 800;
}

.search:focus {
  outline: none;
  background-color: rgb(248, 159, 156);
}

.delete {
  background-color: rgb(246, 101, 96);
  border: 2px solid rgb(107, 44, 42);
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 900;

  padding: 0.3rem 0.7rem;
  margin: 0.6rem 0;
  color: rgb(146, 43, 43);
}

.content {
  font-size: 1.3rem;
}

ol {
  margin-left: 2rem;
}

li {
  width: 93%;
  color: rgb(146, 43, 43);
  font-weight: 100;
  overflow-wrap: break-word;
  margin: 1rem 0;
}
.add-content {
  width: 3rem;
  height: 3rem;
  margin: auto;
}

button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  text-align: right;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  border-radius: 1rem;
}
</style>
