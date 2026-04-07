import React, { useEffect, useState } from 'react';

export default function PantanalPrivacyPolicy() {
  const [showButton, setShowButton] = useState(false);

  // Mostra/esconde o botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Rola para o topo ao montar a página inicialmente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-10 px-4 md:py-16 font-sans text-[#333333] selection:bg-green-200">
      
      {/* container principal */}
      <div className="max-w-[900px] mx-auto bg-[#ffffff] px-6 py-12 md:px-16 md:py-14 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-md">
        
        <h1 className="text-[1.5em] md:text-[1.8em] text-[#111111] text-center mb-2 font-bold leading-tight">
          POLÍTICA DE PRIVACIDADE E AVISO DE COLETA<br></br>PANTANAL WORLD
        </h1>
        
        <p className="text-center italic text-[#666666] mb-10">
          Data de Vigência: 06 de Abril de 2026
        </p>

        <p className="mb-4 text-[1rem] leading-relaxed">
          A <strong>LedesGames</strong>, vinculada ao Laboratório de Engenharia de Software (LEDES) da Faculdade de Computação (FACOM) da UFMS ("LedesGames"), disponibiliza esta Política de Privacidade e Aviso de Coleta (esta "Politica") para os usuários do jogo <strong>Pantanal World</strong> (o "Jogo").
        </p>
            
        <p className="mb-4 text-[1rem] leading-relaxed">
          Ao utilizar o Jogo, você confirma que compreende os termos aqui descritos. Caso tenha dúvidas, entre em contato através do e-mail <strong>ledesgames.facom@ufms.br</strong>.
        </p>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          1. O que esta Política abrange?
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">
          Esta Política define como tratamos (ou deixamos de tratar) seus Dados Pessoais. <strong>O Pantanal World foi projetado sob o princípio de "Privacy by Design", o que significa que o Jogo não coleta, não armazena e não processa intencionalmente dados pessoais identificáveis dos usuários.</strong>
        </p>
        <p className="mb-4 text-[1rem] leading-relaxed">
          Esta Política aplica-se apenas ao Jogo e não se aplica a informações coletadas por terceiros (como a Google Play Store) que possuem suas próprias políticas de privacidade.
        </p>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          2. Processamento de Dados de Crianças
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">
          Definimos como "Criança" qualquer pessoa abaixo da idade necessária para consentir com o processamento de Dados Pessoais em seu país de residência (por exemplo, menores de 13 anos nos EUA ou menores de 12 anos no Brasil, conforme a LGPD).
        </p>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li><strong>Não coleta ativa:</strong> Não solicitamos data de nascimento ou qualquer identificador de crianças.</li>
            <li><strong>Segurança:</strong> Como não coletamos dados de nenhum usuário, o Jogo é inerentemente seguro para o público infantil.</li>
        </ul>
        <p className="mb-4 text-[1rem] leading-relaxed">
          Se você acredita que, por algum motivo técnico ou contato direto (e-mail), uma criança nos forneceu dados pessoais, entre em contato para que possamos deletar as informações imediatamente.
        </p>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          3. Categorias de Dados Pessoais e Coleta
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">Diferente de muitos jogos modernos, o Pantanal World opera com o minimo de interação de dados.</p>
        
        <h3 className="text-[1.1em] text-[#444444] mt-6 mb-2 font-bold">A. Dados de Identificação e Contato</h3>
        <p className="mb-4 text-[1rem] leading-relaxed"><strong>Não coletados:</strong> Não processamos nome, sobrenome, e-mail (a menos que você nos envie um e-mail de suporte), endereço, número de telefone ou identificadores governamentais.</p>
        
        <h3 className="text-[1.1em] text-[#444444] mt-6 mb-2 font-bold">B. Dados de Localização</h3>
        <p className="mb-4 text-[1rem] leading-relaxed"><strong>Não coletados:</strong> O Jogo não acessa o GPS, redes Wi-Fi próximas ou torres de celular para determinar sua localização geográfica.</p>
        
        <h3 className="text-[1.1em] text-[#444444] mt-6 mb-2 font-bold">C. Dados Técnicos e de Dispositivo</h3>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li><strong>Processamento local:</strong> Algumas permissões técnicas podem ser solicitadas pelo sistema operacional Android para garantir a performance do software (ex: acesso ao hardware gráfico). Esses dados permanecem no dispositivo e não são enviados para nossos servidores.</li>
        </ul>

        <h3 className="text-[1.1em] text-[#444444] mt-6 mb-2 font-bold">D. Dados de Uso e Telemetria</h3>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li><strong>Não coletados:</strong> Não rastreamos quanto tempo você joga, quais niveis alcançou ou qualquer comportamento dentro do Jogo para fins de perfilamento (profiling) ou marketing.</li>
        </ul>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          4. Fontes de Dados de Terceiros
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">O Jogo é distribuido via Google Play Store. Ao baixar o Jogo, a Google pode coletar dados de acordo com a própria política deles:</p>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li><strong>Google Play Services:</strong> Pode coletar identificadores de publicidade, relatórios de falhas (crash logs) e estatísticas de instalação.</li>
            <li><strong>Controle:</strong> A LedesGames pode ter acesso a dados agregados e anônimos fornecidos pela Google (ex: "quantas pessoas baixaram o app no Brasil"), mas esses dados não permitem identificar você individualmente.</li>
        </ul>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          5. Finalidade do Processamento
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">Caso qualquer dado seja processado (como em um contato de suporte via e-mail), as finalidades são estritamente:</p>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li><strong>Suporte ao Usuário:</strong> Para responder a dúvidas ou problemas técnicos relatados.</li>
            <li><strong>Cumprimento Legal:</strong> Para responder a ordens judiciais ou processos legais, caso exigido pelas autoridades brasileiras.</li>
            <li><strong>Segurança e Integridade:</strong> Para proteger os direitos e a propriedade da LedesGames e da UFMS.</li>
        </ul>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          6. Base Legal para o Processamento (LGPD)
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), operamos sob as seguintes bases:</p>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li><strong>Execução de Contrato:</strong> Para fornecer as funcionalidades do Jogo que você escolheu baixar.</li>
            <li><strong>Legitimo Interesse:</strong> Para melhorias técnicas e segurança do software.</li>
            <li><strong>Consentimento:</strong> Quando você nos envia voluntariamente um e-mail.</li>
        </ul>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          7. Divulgação de Informações
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">Nós não vendemos, não alugamos e não compartilhamos seus dados para fins de marketing ou publicidade direcionada. Podemos divulgar informações apenas:</p>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li>Para cumprir obrigações legais ou ordens judiciais.</li>
            <li>Em caso de reorganização institucional da UFMS ou do LEDES.</li>
        </ul>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          8. Segurança e Retenção
        </h2>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li><strong>Segurança:</strong> Embora o Jogo não colete dados, seguimos as melhores práticas de desenvolvimento de software da UFMS para garantir que o código seja seguro e livre de vulnerabilidades que possam comprometer seu dispositivo.</li>
            <li><strong>Retenção:</strong> Como não armazenamos dados em servidores próprios, não há período de retenção. E-mails de suporte são deletados após a resolução do problema, a menos que haja necessidade legal de guarda.</li>
        </ul>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          9. Práticas Recomendadas ao Usuário
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">Para sua própria segurança, recomendamos:</p>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li>Não utilize seu nome real ou informações privadas em nomes de usuário (caso o sistema do dispositivo solicite).</li>
            <li>Mantenha o sistema operacional do seu dispositivo atualizado.</li>
        </ul>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          10. Seus Direitos (LGPD e GDPR)
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">Você possui direitos sobre seus dados, incluindo o direito de confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou solicitar a exclusão. Como não coletamos dados, qualquer solicitação desse tipo resultará na confirmação de que não possuímos registros seus em nossos sistemas.</p>

        <h2 className="text-[1.3em] text-[#222222] mt-10 mb-4 border-b border-[#eeeeee] pb-2 font-bold">
          11. Contato e Responsável pelo Tratamento
        </h2>
        <p className="mb-4 text-[1rem] leading-relaxed">A LedesGames (UFMS) é a controladora dos dados no contexto deste Jogo.</p>
        <ul className="list-disc pl-6 mb-5 text-[1rem] leading-relaxed space-y-2">
            <li><strong>Entidade:</strong> LedesGames (LEDES/FACOM/UFMS)</li>
            <li>
              <strong>Site Oficial:</strong> <a href="https://facom.ufms.br/ledesgames" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://facom.ufms.br/ledesgames</a>
            </li>
            <li>
              <strong>E-mail de Privacidade:</strong> <a href="mailto:ledesgames.facom@ufms.br" className="text-blue-600 hover:underline">ledesgames.facom@ufms.br</a>
            </li>
            <li><strong>Endereço:</strong> Av. Costa e Silva, s/n - Pioneiros, Campo Grande - MS, 79070-900</li>
        </ul>

        <div className="mt-12 pt-6 border-t border-[#eeeeee] text-center">
          <p className="font-semibold text-[#555555]">
            Este documento foi elaborado para garantir a máxima transparência e segurança jurídica para o projeto Pantanal World.
          </p>
        </div>
      </div>

      {/* Botão de Voltar ao Topo */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#333333] hover:bg-black text-white p-3 md:p-4 rounded shadow-lg transition-opacity duration-300 ${
          showButton ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Voltar ao topo"
        aria-label="Voltar ao topo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
    </div>
  );
}