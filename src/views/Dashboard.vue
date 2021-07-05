<template>
  <main class="dash-container">
    <Card 
      v-if="onApp"
      :pokemons='pokemons'
      :generation='generationSelected'
      :pokemonSelected='pokemon'
    />
    <div v-else class="offApp"></div>
    <on-button @evButton="toggleOnButton" />
    <Controls
      @updatePokemonList='updatePokemons'
      :pokemons='pokemons'
      :generation='generationSelected'
      :pokemonSelected='pokemon'
    />
  </main>
</template>

<script>
import base_url from '../api/config'
import Card from '../components/Card'
import OnButton from '../components/OnButton.vue'
import Controls from '../components/Controls.vue'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Card,
    OnButton,
    Controls
  },
  data() {
    return {
      list: null,
      onApp: false
    }
  },
  computed: {
    ...mapState({
      pokemon: state => state.pokemonSelected,
      pokemons: state => state.listGeneration,
      generationSelected: state => state.generationSelected  
    })
  },
  created() {
    if (this.generationSelected) {
      this.getAllGeneration()
    }
  },
  methods: {
    toggleOnButton(e) {
      if(this.onApp) {
        this.onApp = !e.toggle
      } else {
        this.onApp = e.toggle
      }
      this.$store.dispatch('getPokemonSelected', `${base_url}/pokemon/1/`)
      this.$store.commit('UPDATE_GENERATION', { id: 1, name: 'I GENERATION' })
      console.log(e)
    },
    async getAllGeneration() {
      const result = await this.$store.dispatch('getAllGeneration', `${base_url}/generation/${this.generationSelected.id}`)
      await this.$store.dispatch('getAllPokemon',result.pokemon_species)
    },
    updatePokemons() {
      this.getAllGeneration()
    }
  },
}
</script>

<style scoped>
  .dash-container {
    position: relative;
    background: url('../assets/pokedex.png') 100% no-repeat;
    width: 800px;
    height: 600px;
  }
  .offApp {
    position: absolute;
    top: 150px;
    left: 27px;
    width: 335px;
    height: 340px;
    background: black;
  }
</style>