<template>
  <div id="app">
    <Header />
    <main class="container-app">
      <router-view/>
    </main>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  export default {
    name: 'App',
    components: {
      Header
    }
  }
</script>

<style>
* {
  font-family: 'Press Start 2P', cursive;
}
body {
  margin: 0px;
}
#app {
  background: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png') 100% no-repeat;
  background-position: bottom right;
  display: grid;
  grid-row: 50px 1fr;
  width: 100%;
  min-height: 100vh;
  height: 100%;
}
.container-app {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 1630px) {
  #app {
    background: linear-gradient(to right, #9441bd 20px, #b44aee 20px, transparent 40%)
  }
}
</style>
