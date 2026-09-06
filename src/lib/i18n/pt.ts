import type { Catalog } from './catalog';
export default {
  language: 'Idioma da interface',
  auto: 'Idioma do navegador',
  skip: 'Ir para o conteúdo',
  home: 'Início do Typeodd',
  play: 'Jogar',
  guide: 'Como jogar',
  about: 'Sobre o jogo',
  faq: 'Perguntas frequentes',
  privacy: 'Privacidade',
  title: 'Typeodd — Jogo grátis de digitação, velocidade e memória',
  description:
    'Digite devagar e o texto fica apagado. Acelere e uma faixa cobre as próximas letras. Jogue sozinho ou em duelo e use a memória para chegar ao fim.',
  start: 'Jogar agora',
  playground: 'Quanto você consegue lembrar?',
  noSignup: 'Sem cadastro nem download.',
  typingLanguage: 'Idioma do texto',
  soundOn: 'Ativar som',
  soundOff: 'Desativar som',
  progress: 'Progresso',
  rhythm: 'Ritmo de digitação',
  accuracy: 'Precisão',
  score: 'Pontuação',
  metrics: 'Estatísticas da partida',
  sessionDone: 'Texto concluído',
  finished: 'Você chegou ao fim!',
  points: 'pts',
  again: 'Jogar de novo',
  copy: 'Copiar resultado',
  inputLabel: 'Digite o texto restante:',
  typeDirectly: 'Digite um caractere por vez. Corrija com Backspace. Colar está desativado.',
  clickType: 'Clique no texto para digitar. Leia um pouco à frente.',
  readAhead: 'Leia à frente, memorize e continue.',
  restart: 'Recomeçar',
  next: 'Próximo texto',
  errorHint: 'Um erro custa 30% dos pontos. Corrija com Backspace.',
  noTimer: 'No modo solo, termine o texto sem limite de tempo.',
  mask: 'Tamanho da faixa',
  veil: 'Texto apagado',
  reward: 'Pontos por letra',
  ruleHint: 'Devagar, o texto apaga. Depressa, ele fica coberto.',
  noJs: 'Ative o JavaScript para jogar. As páginas de ajuda funcionam sem ele.',
  history: 'Textos concluídos',
  localOnly: 'Salvos neste navegador',
  deleteQuestion: 'Apagar seus resultados?',
  delete: 'Apagar',
  cancel: 'Cancelar',
  clearHistory: 'Apagar resultados',
  saveFailed: 'Não foi possível salvar. O resultado fica apenas nesta tela.',
  deleteFailed: 'Não foi possível apagar. Confira as configurações do navegador.',
  copied: 'Resultado copiado.',
  guideTitle: 'Como jogar',
  guideLead: 'Leia à frente e lembre das letras cobertas para chegar ao fim.',
  guideSections: [
    {
      title: '1. Escolha um texto',
      body: 'Escolha inglês ou coreano, clique no texto e digite. Cada letra correta desaparece e o restante avança. Recomeçar reinicia o mesmo texto; Próximo texto traz outro.'
    },
    {
      title: '2. Guarde algumas palavras na memória',
      body: 'Digitar devagar deixa as letras apagadas. Digitar rápido e sem erros devolve a nitidez, mas aumenta a faixa cinza. Leia antes que as palavras passem por baixo dela. Ao parar, a faixa diminui; ao voltar a digitar, o texto pode ficar ainda mais apagado.'
    },
    {
      title: '3. Ganhe pontos e corrija erros',
      body: 'Uma faixa maior dá mais pontos por letra certa. Um erro reduz a faixa e tira 30% da pontuação, arredondados para cima: com 101 pontos, você perde 31. Use Backspace para apagar a letra errada. Pelas regras originais, apagar também tira pontos.'
    },
    {
      title: '4. Jogue sozinho ou dispute um duelo',
      body: 'O modo solo não tem limite de tempo. No duelo, ambos recebem o mesmo texto e quem termina primeiro vence. Sair conta como desistência. A partida dura no máximo 15 minutos. O ritmo ao vivo reflete as últimas entradas; o resultado solo mostra a média da rodada.'
    }
  ],
  aboutTitle: 'O que é Typeodd?',
  aboutLead: 'Um jogo de digitação em que você precisa lembrar o que vem a seguir.',
  aboutSections: [
    {
      title: 'A velocidade traz um novo desafio',
      body: 'Devagar, as palavras ficam apagadas. Depressa, uma faixa as cobre. Quanto mais você acelera, mais precisa lembrar. Acertar um trecho escondido e recuperar o ritmo depois de um erro fazem parte da diversão.'
    },
    {
      title: 'Pequenas histórias de hoje',
      body: 'Uma mensagem não enviada, uma viagem pela cidade, a última partida entre amigos: criamos 30 textos em inglês e 30 em coreano, em seis temas do cotidiano e da imaginação. O idioma da interface é uma escolha separada.'
    },
    {
      title: 'Criado por zendoc',
      body: 'E se digitar usasse a memória tanto quanto os dedos? Typeodd nasceu dessa ideia. Esta versão mantém as regras originais de cobertura e perda de nitidez, com novos textos e uma interface renovada. Veja o código e outros projetos nos links abaixo.'
    }
  ],
  faqPageTitle: 'Algumas respostas úteis',
  faqLead: 'O que saber antes da próxima rodada.',
  faqs: [
    {
      q: 'Qual é o objetivo?',
      a: 'Terminar o texto lembrando das letras cobertas. A digitação lenta apaga o texto; a rápida aumenta a faixa que o esconde.'
    },
    {
      q: 'Por que o texto se esconde quando vou bem?',
      a: 'Para aumentar o desafio de memória. Uma faixa maior também rende mais pontos por letra correta.'
    },
    {
      q: 'Como perco pontos?',
      a: 'Cada erro custa 30% dos pontos, arredondados para cima: 31 de 101. Apagar uma letra errada com Backspace também desconta pontos.'
    },
    {
      q: 'Posso pausar?',
      a: 'Não há pausa. A faixa continua diminuindo se você trocar de aba. O solo não tem limite de tempo; o duelo dura até 15 minutos.'
    },
    {
      q: 'Em quais idiomas posso digitar?',
      a: 'São 30 textos em inglês e 30 em coreano. O idioma da interface é independente. No celular, toque no texto para abrir o teclado. Caracteres coreanos são avaliados quando a composição termina.'
    },
    {
      q: 'Onde ficam os resultados?',
      a: 'Os últimos 50 resultados solo ficam neste navegador. Os resumos anônimos de duelos expiram em sete dias e são apagados ao iniciar o servidor ou salvar o próximo resultado. Não há cadastro nem ranking público.'
    },
    {
      q: 'Como começo um duelo?',
      a: 'Escolha o duelo e busque alguém com o mesmo idioma de texto. Vocês começam juntos após três segundos. O servidor confirma a vitória. Sair é desistir; perder a conexão encerra a partida após dez segundos, sem retomada.'
    }
  ],
  privacyTitle: 'Seus dados',
  privacyLead: 'O que fica no navegador e o que é enviado em um duelo.',
  privacySections: [
    {
      title: 'No seu navegador',
      body: 'Guardamos até 50 resultados solo: versão das regras, texto, idioma, data, pontos, duração, velocidade e precisão. Também ficam salvas as preferências de som e idioma. Apagar resultados remove as partidas; limpar os dados do navegador remove também as preferências. Copiar resultado só usa a área de transferência quando você pede.'
    },
    {
      title: 'Durante o duelo',
      body: 'As entradas confirmadas seguem por WSS criptografado e Cloudflare Tunnel ao servidor Rust e são processadas em memória. O SQLite guarda apenas ID anônimo da partida, texto, idioma, pontos, progresso, tentativas, vencedor, duração e motivo do encerramento. O banco do jogo não guarda registros brutos de digitação, nomes ou IPs. Os resumos expiram em sete dias e são apagados ao iniciar o servidor ou salvar o próximo resultado.'
    },
    {
      title: 'Hospedagem',
      body: 'Cloudflare Pages fornece o site e Google Fonts fornece as fontes. Esses serviços recebem os dados de rede necessários para funcionar. O jogo não inclui anúncios nem scripts separados de análise de visitas.'
    },
    {
      title: 'Chat',
      body: 'O chat ainda não está disponível. A retenção e a exclusão de mensagens serão explicadas antes do lançamento.'
    }
  ]
} satisfies Catalog;
