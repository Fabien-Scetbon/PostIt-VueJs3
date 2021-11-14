<template>
  <div class="container">
    <p class="info">Here, you can edit, update or delete a Post-it.</p>
    <div class="note">
      <div class="alerte">{{ message }}</div>

      <div class="header">
        <h2 class="noteTitle">{{ note.title }}</h2>
      </div>
      <ol class="content">
        <li v-for="(task, index) in note.content" :key="index">
          {{ task }}
        </li>
      </ol>
      <div class="add-content">
        <button class="update">
          <i
            class="fas fa-edit"
            style="color: green"
            v-on:click="goUpdate(note._id)"
          ></i>
        </button>
        <button class="delete">
          <i
            class="fas fa-trash-alt"
            style="color: red"
            v-on:click="goDelete(note._id)"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  data() {
    return {
      message: '',
    }
  },
  mounted() {
    // sert a modifier le DOM
    // console.log(this.$route.params.id)
    let id = this.$route.params.id
    this.$store.dispatch('getNote', id)
  },
  computed: {
    // accede a l'etat du store et update variable
    note() {
      return this.$store.state.note
    },
  },
  methods: {
    goDelete(id) {
      console.log(id)
      this.$store.dispatch('goDelete', id) // similaires aux mutations mais ne mute pas l'etat, les actions commettent des mutations
      // on appelle les actions avec this.$store.dispatch('nomAction')
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.message = 'Post-it deleted successfully !'
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    },
    goUpdate(id) {
      console.log(id)
      this.$router.push(`/update/${id}`)
      // console.log(id)
    },
  },
}
</script>

<style scoped lang="scss">
li {
  width: 93%;
  color: rgb(83, 28, 28);
  font-weight: 100;
  overflow-wrap: break-word;
  margin: 1rem 0;
  display: list-item;
  list-style-type: decimal;
}

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
  width: 32rem;
  min-width: 40rem;
  height: auto;
  padding: 1rem;
  padding-bottom: 2rem;
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

.header {
  text-align: center;
}

.header i {
  width: 2rem;
  color: rgb(51, 63, 153);
  font-size: 1.3rem;
}

.noteId {
  font-size: 1.3rem;
}

.content {
  font-size: 1.3rem;
  margin: 0 2rem 0 4rem;
}

.noteTitle {
  width: 10rem;
  margin: auto;
  font-size: 1.3rem;
  overflow-wrap: break-word;
}

.add-content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: auto;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0.4rem 0;
}

.alerte {
  width: auto;
  margin: auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: red;
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
