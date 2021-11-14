<template>
  <div class="container">
    <p class="info">Here, you can update a Post-it.</p>
    <div class="note">
      <div class="alerte">{{ message }}</div>
      <div class="header">
        <p class="title">Title</p>
        <input class="search" type="text" v-model="title" />
      </div>
      <p
        class="title"
        style="margin-left: 1.9rem; margin-top: 1rem; margin-bottom: 0.2rem"
      >
        Tasks
      </p>
      <form @submit.prevent="addNewTask">
        <!-- remplace prevent default pour ne pas rafraichir la page a l'input-->

        <input
          class="search task"
          v-model="newTask"
          name="newTask"
          placeholder="Add a new task"
        />
        <button style="margin: 8px 0 0 3px; position: relative">
          <i
            class="fas fa-plus-circle"
            style="
              color: green;
              font-size: 2rem;
              margin: auto;
              position: absolute;
              top: -1.5rem;
              left: 5px;
            "
          ></i>
        </button>
      </form>
      <button v-if="tasks.length > 1" class="delete" @click="deleteAll">
        Delete all
      </button>

      <ol>
        <li class="content" v-for="(task, index) in tasks" :key="index">
          <input class="search" v-model="tasks[index]" />
          <button
            @click="deleteTask(index)"
            style="margin: 8px 0 0 3px; position: relative"
          >
            <i
              class="fas fa-trash-alt"
              style="
                color: red;
                font-size: 1.5rem;
                margin: auto;
                position: absolute;
                top: -1.5rem;
                left: 5px;
              "
            ></i>
          </button>
        </li>
      </ol>
      <div class="add-content">
        <button class="update" @click="validUpdate(note._id)">
          <i
            class="far fa-hand-point-right"
            style="color: blue; font-size: 2.5rem"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Update',
  data() {
    return {
      tasks: [],
      title: '',
      message: '',
      newTask: '',
    }
  },
  mounted() {
    // modifie le DOM
    // console.log(this.$route.params.id)

    let id = this.$route.params.id
    this.$store.dispatch('getNote', id) //
    this.tasks = this.note.content
    this.title = this.note.title

    console.log('dans mounted Update')
    console.log('ID')
    console.log(id)
    console.log('TITLE')
    console.log(this.title)
    console.log('CONTENT')
    console.log(this.tasks)
  },
  computed: {
    // accede a l'etat du store dans les views et update variables
    note() {
      return this.$store.state.note
    },
  },
  methods: {
    addNewTask() {
      this.tasks.unshift(this.newTask)
      this.newTask = ''
    },

    deleteTask(index) {
      console.log('delete')
      this.tasks.splice(index, 1)
    },

    deleteAll() {
      this.tasks = []
    },

    validUpdate(id) {
      console.log('dans validUpdate')
      console.log(id)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

      const url = `http://5.135.119.239:3090/notes/${id}`

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: this.title, content: this.tasks }),
      }).then((res) => {
        if (res.ok) {
          this.message = "You've updated a Post-it !"
          this.$store.dispatch('getNote', id)
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

.delete {
  width: 8.5rem;
  background-color: rgb(246, 101, 96);
  border: 2px solid rgb(107, 44, 42);
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 900;
  padding: 0.3rem 0.7rem;
  margin-top: 1rem;
  margin-left: 1rem;
  color: rgb(146, 43, 43);
}

ol {
  margin-left: 1rem;
}

li {
  position: relative;
  width: 93%;
  color: rgb(146, 43, 43);
  font-weight: 100;
  overflow-wrap: break-word;
  margin: 1rem 0;
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

.task {
  margin-left: 1rem;
}

.search:focus {
  outline: none;
  background-color: rgb(248, 159, 156);
}

.header {
  margin: auto;
}

.content {
  font-size: 1.3rem;
}

.alerte {
  width: auto;
  margin: auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: red;
}

.add-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: auto;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0.4rem 0;
}

button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  text-align: right;
  color: rgb(255, 255, 255, 0.5);
  font-size: 1.8rem;
  padding: 0;
  margin: 0;
  border-radius: 1rem;
  color: rgb(0, 0, 0, 0.7);
}
</style>
