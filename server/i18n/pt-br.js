/* eslint no-template-curly-in-string: "off" */
module.exports = {
  MESSAGE_METHOD_MANDATORY: 'O método "${0}" precisa ser implementado',
  PARAM_MANDATORY: 'O parâmetro "${0}" é obrigatório',
  PARAM_INVALID: 'O parâmetro "${0}" está inválido, precisa ser do tipo "${1}"',
  ENUM_INVALID: 'O parâmetro "${0}" está inválido, precisa ser um desses valores: "${1}"',
  NOT_EXISTS: 'O dado: "${0}" da origem: "${1}" não existe',
  REMOVE_ALL_BLOCK: 'Não é permitido remover todo os registros', // medida de segurança para bloquear uma remoção sem o where,
  USER_INATIVO: 'Este usuário não tem acesso ativo',
  INVALID_ACESS: 'Acesso inválido',
  FORMAT_INVALID: 'Formato "${0}" não suportado',
  MODEL_NOT_MANAGED: 'Esta entidade não é gerenciada para validações de autorização',

  PLANILHA_NAO_ENCONTRADA: 'Este nome: "${0}" não foi encontrado nas planilhas suportadas!',
  PLANILHA_OBRIGATORIA: 'A planilha XLS(x) de nome: "${0}" não foi encontrada no zip'
}
