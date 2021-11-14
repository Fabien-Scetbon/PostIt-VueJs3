import { createStore } from 'vuex'

export default createStore({
  state: {
    // etat du store avec variables du store (pour y acceder dans les views : this.$store.state)
    notes: [],
    note: {},
  },
  mutations: {
    // methodes pour changer etat du store
    // (on appelle les mutations par this.$store.commit('nomMutation') dans les views)
    setNotes(state, notes) {
      state.notes = notes
    },
    setNote(state, note) {
      state.note = note
    },
  }, // pas async
  actions: {
    // similaires aux mutations mais ne mute pas l'etat, les actions commettent des mutations
    // on appelle les actions avec this.$store.dispatch('nomAction')
    // on peut aussi mettre ces actions directement dans la page concernee comme pour add ou update
    getNotes({ commit }) {
      const url = 'http://5.135.119.239:3090/notes'

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        res.json().then((data) => {
          console.log('dans getNotes')
          console.log(data)
          commit('setNotes', data.notes) // fetch les donnees sur l'api et
          // modifie l'etat du store avec les nouvelles donnees
        })
      })
    },
    getNote({ commit }, id) {
      // on dirait qu'on met entre { } la fonction appelee plus bas : commit
      const url = `http://5.135.119.239:3090/notes/${id}`

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        res.json().then((data) => {
          console.log('dans getNote')
          console.log(data.note)

          commit('setNote', data.note) // fetch les donnees sur l'api et
          // modifie l'etat du store avec les nouvelles donnees
        })
      })
    },
    goDelete({ dispatch }, id) {
      // api delete automatiqueemnt a l'appel de la methode DELETE

      console.log('dans goDelete')
      console.log(dispatch)
      console.log(id)

      const url = `http://5.135.119.239:3090/notes/${id}`

      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status == 200) {
          dispatch('getNotes')
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
  modules: {},
})
// on peut avoir des variables en temps reel (etat)
// pour changer cet etat , on cree des methodes comme mutation
//

// {
//   _id: "1",
//   title: "Work Notes",
//   content: ["Project Bidule", "Think about sth", "Think about sth", "Think about sth"]
// },
// {
//   _id: "2",
//   title: "Projects perso",
//   content: ["Think about", "Think about sth", "Think about sth", "Think about sth", "Think about sth", "Think about sth", "Think about sth"]
// },
// {
//   _id: "1",
//   title: "Work Notes",
//   content: ["Project Bidule", "Think about sth"]
// },
// {
//   _id: "2",
//   title: "Projects perso",
//   content: ["Think about", "Think about sth"]
// },{
//   _id: "1",
//   title: "Work Notes",
//   content: ["Project Bidule", "Think about sth"]
// },
// {
//   _id: "2",
//   title: "Projects perso",
//   content: ["Think about", "Think about sth"]
// },{
//   _id: "1",
//   title: "Work Notes",
//   content: ["Project Bidule", "Think about sth"]
// },
// {
//   _id: "2",
//   title: "Projects perso",
//   content: ["Think about", "Think about sth"]
// },{
//   _id: "1",
//   title: "Work Notes",
//   content: ["Project Bidule", "Think about sth"]
// },
// {
//   _id: "2",
//   title: "Projects perso",
//   content: ["Think about", "Think about sth"]
// },{
//   _id: "1",
//   title: "Work Notes",
//   content: ["Project Bidule", "Think about sth"]
// },
// {
//   _id: "2",
//   title: "Projects perso",
//   content: ["Think about", "Think about sth"]
// },{
//   _id: "1",
//   title: "Work Notes",
//   content: ["Project Bidule", "Think about sth"]
// },
// {
//   _id: "2",
//   title: "Projects perso",
//   content: ["Think about", "Think about sth"]
// },{
//   _id: "1",
//   title: "Work Notes",
//   content: ["Project Bidule", "Think about sth"]
// },
// {
//   _id: "2",
//   title: "Projects perso",
//   content: ["Think about", "Think about sth"]
// },
