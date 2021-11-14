<template>
  <div
    class="note"
    :style="`background-color: ${backgColor} ; transform: rotate(${rotate})`"
  >
    <div class="header">
      <div class="noteId" style="color: rgb(51, 63, 153)">
        No{{ index + 1 }}
      </div>
      <h3 class="noteTitle">{{ note.title }}</h3>
    </div>
    <div class="content">
      <div>
        <p v-for="(task, index) in note.content" :key="index">
          <i
            class="fas fa-arrow-right"
            style="color: rgb(240, 136, 136); font-size: 1rem"
          ></i
          >&nbsp;{{ task }}
        </p>
      </div>
    </div>
    <div class="add-content">
      <button class="edit">
        <i
          class="fas fa-edit"
          :style="`color: ${backgColor}`"
          v-on:click="goEdit(note._id)"
        ></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notes',
  data() {
    return {
      backgColor: '',
      rotate: '',
    }
  },
  created() {
    let colors = ['4DA6F4', 'F4BC4D', 'E885DD', '7CF157']
    let rand = Math.floor(Math.random() * 4)
    let backgColor = colors[rand]
    this.backgColor = '#' + backgColor

    let degre = (Math.random() - 0.5) / 20
    let rotate = degre + 'turn'
    this.rotate = rotate
  },
  props: {
    //recevoir donnee depuis le parent (celui qui appelle ça)
    index: Number,
    key: String,
    note: {
      _id: String,
      title: String,
      content: Array,
    },
  },
  methods: {
    goEdit(id) {
      this.$router.push(`/edit/${id}`)
      // console.log(id)
    },
  },
}
</script>

<style scoped lang="scss">
.note {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 20rem;
  min-width: 20rem;
  height: 20rem;
  padding: 1rem;
  margin: 1rem;
  border-radius: 0.5rem;
  background-image: linear-gradient(
    35deg,
    rgba(233, 233, 233, 0.01),
    rgba(240, 240, 240, 0.9)
  );
  box-shadow: -13px 20px 5px rgb(10, 10, 10);
}

.header {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.2rem;
  overflow-wrap: break-word;
}

.header i {
  width: 2rem;
  color: rgb(51, 63, 153);
  font-size: 1.3rem;
  margin: 0 0.6rem;
  padding-bottom: 0;
}

.noteId {
  font-size: 1.3rem;
  margin: 0 0.6rem;
}

.noteTitle {
  width: 10rem;
  margin: auto;
  font-size: 1.3rem;
  overflow-wrap: break-word;
}

.content {
  width: 97%;
  height: 15rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  font-size: 1.3rem;
}

.content p {
  margin: 1.2rem;
  line-height: 140%;
  overflow-wrap: break-word;
}

.add-content {
  position: absolute;
  right: 5px;
  bottom: 5px;
  text-align: right;
  height: auto;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0.4rem 0;
}

.add-content h4 {
  margin: auto;
}

.edit {
  float: right;
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
