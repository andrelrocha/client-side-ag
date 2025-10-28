export interface ErrorTranslation {
  key: string;
  message: string;
}

export const ERROR_MAP: Record<string, ErrorTranslation> = {
  BadCredentialsException: {
    key: 'Erro de Credenciais',
    message: 'Login ou senha inválidos. Tente novamente.'
  },
  MethodArgumentNotValidException: {
    key: 'Dados Inválidos',
    message: 'Algum campo obrigatório não foi informado ou está incorreto.'
  },
  AccessDeniedException: {
    key: 'Acesso Negado',
    message: 'Você não tem permissão para acessar este recurso.'
  },
  UserNotFoundException: {
    key: 'Usuário Não Encontrado',
    message: 'O usuário solicitado não existe ou foi removido.'
  },
  ValidationException: {
    key: 'Erro de Validação',
    message: 'Existem campos com erro ou dados inválidos.'
  },
  EntityNotFoundException: {
    key: 'Registro Não Encontrado',
    message: 'O recurso solicitado não existe ou foi excluído.'
  },
  IllegalArgumentException: {
    key: 'Argumento Inválido',
    message: 'Os dados enviados não estão de acordo com as regras.'
  },
  HttpMessageNotReadableException: {
    key: 'Formato Inválido',
    message: 'Os dados enviados possuem formato inesperado.'
  },
  InvalidDateFormat: {
    key: 'Data Inválida',
    message: 'Use o formato de data YYYY-MM-DD.'
  },
  AuthenticationException: {
    key: 'Erro de Autenticação',
    message: 'Falha ao autenticar usuário. Verifique login/senha.'
  },
  LockedException: {
    key: 'Conta Bloqueada',
    message: 'Sua conta está bloqueada. Contate o suporte.'
  },
  DataIntegrityViolationException: {
    key: 'Violação de Integridade',
    message: 'Dados duplicados ou violação de regras de banco.'
  },
  UniqueConstraintViolation: {
    key: 'Dado já utilizado',
    message: 'Email ou nome de usuário já cadastrado.'
  },
  MaxUploadSizeExceededException: {
    key: 'Arquivo Muito Grande',
    message: 'O arquivo enviado excede o tamanho máximo permitido.'
  },
  InternalAuthenticationServiceException: {
    key: 'Credenciais Incorretas',
    message: 'Login ou senha incorretos. Verifique e tente novamente.'
  },
  RuntimeException: {
    key: 'Erro Interno',
    message: 'Tivemos um problema interno. Tente recarregar ou acione o suporte.'
  },
  Exception: {
    key: 'Erro Desconhecido',
    message: 'Ocorreu um erro inesperado. Tente novamente ou reporte ao suporte.'
  },
};
