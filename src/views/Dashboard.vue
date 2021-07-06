<template>
  <main class="dash-container">
    <Card 
      v-if="onApp && !toggleCardEvolution"
      :pokemons='pokemons'
      :generation='generationSelected'
      :pokemonSelected='pokemon'
    />
    <div v-if="!onApp" class="offApp"></div>
    <card-evolution v-if="toggleCardEvolution" :pokemonSpecies='species'></card-evolution>
    <on-button @evButton="toggleOnButton" />
    <Controls
      @updatePokemonList='updatePokemons'
      @onCardEvolution='cardEvolution'
      :pokemons='pokemons'
      :generation='generationSelected'
      :pokemonSelected='pokemon'
      :onApp='onApp'
    />
  </main>
</template>

<script>
import base_url from '../api/config'
import Card from '../components/Card'
import CardEvolution from '../components/CardEvolution'
import OnButton from '../components/OnButton.vue'
import Controls from '../components/Controls.vue'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Card,
    CardEvolution,
    OnButton,
    Controls,
  },
  data() {
    return {
      list: null,
      onApp: false,
      toggleCardEvolution: false
    }
  },
  computed: {
    ...mapState({
      pokemon: state => state.pokemonSelected,
      species: state => state.pokemonSpecies,
      pokemons: state => state.listGeneration,
      generationSelected: state => state.generationSelected,
    })
  },
  mounted() {
    if (this.generationSelected) {
      this.getAllGeneration()
    }
  },
  methods: {
    cardEvolution(e) {
      if(this.toggleCardEvolution) {
        this.toggleCardEvolution = !e.toggle
      } else {
        this.toggleCardEvolution = e.toggle
      }
    },
    toggleOnButton(e) {
      if(this.onApp) {
        this.onApp = !e.toggle
        this.toggleCardEvolution = false
      } else {
        this.onApp = e.toggle
        this.toggleCardEvolution = false
      }
    this.toggleUpdate()
    },
    async getAllGeneration() {
      const result = await this.$store.dispatch('getAllGeneration', `${base_url}/generation/${this.generationSelected.id}`)
      await this.$store.dispatch('getAllPokemon',result.pokemon_species)
    },
    async toggleUpdate() {
      let info = {
        url: `${base_url}/pokemon/1/`,
        mutation: 'UPDATE_POKEMON'
      }
      await this.$store.dispatch('getPokemonSelected', info)
      await this.$store.commit('UPDATE_GENERATION', { id: 1, name: 'I GENERATION' })
      this.$store.dispatch('getAllGeneration', `${base_url}/generation/${this.generationSelected.id}`)
      this.updateSpecies()
    },
    updatePokemons() {
      this.getAllGeneration()
        .then(() => {
          let name = this.pokemons[0].name
          let info = {
            url: `${base_url}/pokemon/${name}`,
            mutation: 'UPDATE_POKEMON'
          }
          this.$store.dispatch('getPokemonSelected', info)
    
          let infoSpecies = {
            url: `${base_url}/pokemon-species/${name}`,
            mutation: 'UPDATE_SPECIES'
          }
          this.$store.dispatch('getPokemonSelected', infoSpecies)
        })
    },
    async updateSpecies() {
      let info = {
        url: `${base_url}/pokemon-species/${this.pokemon.name}`,
        mutation: 'UPDATE_SPECIES'
      }
      await this.$store.dispatch('getPokemonSelected', info)
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