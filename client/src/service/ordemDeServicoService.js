import BaseService from "./baseService";


export default class OrdemDeServicoService {

    constructor() {
        this.urlOS = new BaseService().createAPISecured()
    }

    find() {
        return this.urlOS.get('/ordemServico?where=[]&page=1')
    }
}