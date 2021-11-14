<template>
  <div>
    <div id="nav">
      <router-link to="/"> <!-- renvoie a la page / -->
        <button id="close" class="button">
          <i class="fas fa-home"></i>
        </button>
      </router-link>
      <h1>&nbsp;POST-IT&nbsp;</h1>
      <router-link to="/add">
        <button id="newPost" class="button">
          <i class="fas fa-pencil-alt"></i>
        </button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Yomogi&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Yomogi', sans-serif;
  text-decoration: none;
}

.button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  background-color: rgb(255, 255, 255, 0.1);
  color: rgb(255, 255, 255, 0.5);
  padding: 0.2rem 1rem;
  font-size: 3rem;
  border-radius: 1rem;
  box-shadow: -4px 6px 5px rgb(10, 10, 10);
}

button:active {
  transform: scale(0.9);
}

html {
  background: url(./assets/tableau.png) no-repeat top/cover;
  background-attachment: fixed;
}

#app {
  margin: auto;
  padding: 0.5rem;
  width: 100%;
  min-width: 350px;
}

#nav {
  height: 4.5rem;
  width: 97%;
  min-width: 450px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  border-radius: 20px;
  padding: 1.5rem;
  background: linear-gradient(85deg, rgb(246, 139, 97), rgb(251, 174, 143));
}

#nav h1 {
  color: rgb(214, 71, 66);
  font-size: 3rem;
  margin-top: 5px;
  border-bottom: 3px rgb(133, 62, 44) solid;
  border-top: 3px rgb(133, 62, 44) solid;
  box-shadow: -4px 6px 5px rgb(10, 10, 10);
}

#nav i {
  font-size: 2.5rem;
  width: 3rem;
  color: rgb(214, 71, 66);
}
</style>
