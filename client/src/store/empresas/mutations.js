export default {
    setCurrentEmpresa (state, currentEmpresa) {
      state.currentEmpresa = currentEmpresa
    },
    set_loading (state, isLoading) {
      state.isLoading = isLoading
    },
    set_data (state, { data }) {
      state.data = {
        ...state.data,
        empresas: data
      }
    }
}