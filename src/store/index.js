import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listPokemons: '',
    listGeneration: '',
    generationSelected: '',
    pokemonSelected: '',
    pokemonSpecies: ''
  },
  mutations: {
    LIST_POKEMON(state, payload) {
      state.listPokemons = payload
    },
    LIST_GENERATION(state, payload) {
      state.listGeneration = payload
    },
    UPDATE_GENERATION(state, payload) {
      state.generationSelected = payload
    },
    UPDATE_POKEMON(state, payload) {
      state.pokemonSelected = payload
    },
    UPDATE_SPECIES(state, payload) {
      state.pokemonSpecies = payload
    }
  },
  actions: {
    getAllGeneration({commit}, url) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then(res => res.json())
          .then(res => {
            const { pokemon_species } = res
            commit('LIST_GENERATION', pokemon_species)
            resolve(pokemon_species)
            console.log(pokemon_species)
          })
          .catch(err => reject(err))
      })
    },
    getAllPokemon({commit}, info) { 
      return new Promise((resolve, reject) => {
        try {
          resolve(commit('LIST_POKEMON', info))
        } catch (error) {
          reject(error)
        }
      })  
    },
    getPokemonSelected({commit}, info) {
      return new Promise((resolve, reject) => {
        fetch(info.url)
          .then(res => res.json())
          .then(res => {
            commit(info.mutation, res)
            resolve(res)
          })
          .catch(err => reject(err))
      })
    }
  }
})