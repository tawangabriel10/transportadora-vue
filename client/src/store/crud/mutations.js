export default {
  setCurrentEmpresa (state, currentEmpresa) {
    state.currentEmpresa = currentEmpresa
  },
  set_loading (state, isLoading) {
    state.isLoading = isLoading
  },
  set_data (state, { entity, data }) {
    state.data = {
      ...state.data,
      [entity]: data
    }
  },
  setFilter (state, { entity, filter }) {
    state.filter = {
      ...state.filter,
      [entity]: filter
    }
  }
}
