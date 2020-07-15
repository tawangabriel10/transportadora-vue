export default {
    save_request (state) {
      state.status = 'loading'
    },
    save_success (state, data) {
      state.status = 'success'
      state.ordemServico = data.ordemServico
    },
    save_error (state) {
      state.status = 'error'
    }
}
  