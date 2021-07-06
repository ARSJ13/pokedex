<template>
  <section class="control-container">
    <h5>selected generation: <br /> '&#5130;''&#5125;'</h5>
    <div class="generation-content">
      <div class="control-input">
        <input v-if="onApp" type="text" v-model="generation.name">
        <input v-if="!onApp" type="text">
      </div>
      <h5>selected pokemon: <br /> '&#5123;' '&#10006;' '&#5121;'</h5>
      <div class="control-buttons">
        <button @click="upPokemon" :disabled='!onApp || buttonSelected'>&#5123;</button>
        <div class="control-button-selected">
          <button @click="pageDown" :disabled='!onApp || buttonSelected'>&#5130;</button>
          <button @click="selected" class="button-select" :disabled='!onApp'>&#10006;</button>
          <button @click="pageUp" :disabled='!onApp || buttonSelected'>&#5125;</button>
        </div>
        <button @click="downPokemon" :disabled='!onApp || buttonSelected'>&#5121;</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import base_url from '../api/config'
export default {
  name: 'Controls',
  props: ['generation', 'onApp'],
  computed: {
    ...mapState({
      pokemons: state => state.listGeneration
    }),
    buttonSelected() {
      return this.selectedButton
    }
  },
  data() {
    return {
      generations: [
        {
          id: 1,
          name: 'I GENERATION'
        },
        {
          id: 2,
          name: 'II GENERATION'
        },
        {
          id: 3,
          name: 'III GENERATION'
        },
        {
          id: 4,
          name: 'IV GENERATION'
        },
        {
          id: 5,
          name: 'V GENERATION'
        },
        {
          id: 6,
          name: 'VI GENERATION'
        },
        {
          id: 7,
          name: 'VII GENERATION'
        },
        {
          id: 8,
          name: 'VIII GENERATION'
        }
      ],
      focusGeneration: null,
      count: 0,
      countPokemon: 0,
      selectedButton: false
    }
  },
  created() {
    this.focusGeneration = this.generations[0]
    this.$store.commit('UPDATE_GENERATION', this.focusGeneration)
  },
  updated() {
    if(!this.onApp) this.focusGeneration = this.generations[0]
  },
  methods: {
    pageUp() {
      if (this.focusGeneration.id < 8) {
        this.count++
        this.focusGeneration = this.generations[this.count]
        this.$store.commit('UPDATE_GENERATION', this.focusGeneration)
        this.$emit('updatePokemonList')
        this.countPokemon = 0
      } else {
        alert('Max generation!')
      }
    },
    pageDown() {
      if (this.focusGeneration.id > 1) {
        this.count--
        this.focusGeneration = this.generations[this.count]
        this.$store.commit('UPDATE_GENERATION', this.focusGeneration)
        this.$emit('updatePokemonList')
        this.countPokemon = 0
      } else {
        alert('Min generation!')
      }
    },
    upPokemon() {
      if (this.countPokemon<=this.pokemons.length) {
        this.countPokemon += 1
        this.updateSelectPokemon(this.countPokemon)
      }
    },
    selected() {
      this.$emit('onCardEvolution', {toggle: true})
      this.selectedButton = !this.selectedButton
    },
    downPokemon() {
      if (this.countPokemon>=0) {
        this.countPokemon -= 1
        this.updateSelectPokemon(this.countPokemon)
      }
    },
    updateSelectPokemon(count) {
      let name = this.pokemons[count].name
      let info = {
        url: `${base_url}/pokemon/${name}`,
        mutation: 'UPDATE_POKEMON'
      }
      this.$store.dispatch('getPokemonSelected', info)
        .then(() => {
          let infoSpecies = {
            url: `${base_url}/pokemon-species/${name}`,
            mutation: 'UPDATE_SPECIES'
          }
          this.$store.dispatch('getPokemonSelected', infoSpecies)
        })
    }
  }
}
</script>

<style scoped>
  .control-container {
    position: absolute;
    top: 150px;
    right: 50px;
  }
  h5 {
    text-align: center;
    line-height: 1.2rem;
  }
  .control-input {
    display: flex;
    justify-content: center;
  }
  .control-input>input {
    width: 200px;
    background: black;
    color: white;
    padding: 0.5rem 1rem;
  }
  .control-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 200px;
    margin: 2rem auto;
    padding: 0.5rem;
    border-style: inset;
  }
  .control-buttons>button {
    padding: 10px 14px;
  }
  .control-button-selected>button{
    padding: 10px 13px;
  }
  .control-button-selected>button, .control-buttons>button {
    border-radius: 50%;
    background:#000;
    color: #fff;
  }
  .control-button-selected>button.button-select{
    margin: 10px;
    background: red;
  }
</style>