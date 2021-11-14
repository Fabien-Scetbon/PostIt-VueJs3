<template>
  <div id="notes">
    <!-- appel le composant Notes -->
    <Notes
      v-for="(note, index) in notes"
      :index="index"
      :key="note._id"
      :note="note"
    />
  </div>
</template>

<script>
import Notes from '@/components/Notes.vue'

export default {
  name: 'Home',
  components: {
    Notes,
  },
  mounted() {
    // modifie le DOM
    this.$store.dispatch('getNotes')
  },
  computed: {
    // accede a l'etat du store et update variable
    notes() {
      return this.$store.state.notes
    },
  },
}
</script>

<style lang="scss">
#notes {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 97%;
  min-width: 450px;
  margin: 0.5rem 0;
  background-color: rgb(255, 255, 255, 0.1);
  padding: 1rem;
}
</style>
