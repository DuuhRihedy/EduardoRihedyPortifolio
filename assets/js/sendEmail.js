/*===== EMAILJS INITIALIZATION =====*/
/*
 * SETUP CHECKLIST — Verifique no painel EmailJS (https://dashboard.emailjs.com):
 * 1. Service: "service_3ty33uj" deve estar conectado ao seu Gmail (duuh.dorneles@gmail.com)
 * 2. Template: "template_a3yj6an" deve conter as variáveis:
 *    - {{from_name}} — Nome do remetente
 *    - {{from_email}} — Email do remetente  
 *    - {{message}} — Mensagem
 *    - {{to_email}} — No campo "To Email" do template, coloque: duuh.dorneles@gmail.com
 * 3. Public Key: "cZSIscmBXxL2LxzO8" deve estar ativo
 * 4. O plano gratuito permite 200 emails/mês
 */

(function () {
  try {
    emailjs.init("cZSIscmBXxL2LxzO8");
    console.log('[EmailJS] Inicializado com sucesso.');
  } catch (error) {
    console.error('[EmailJS] Erro na inicialização:', error);
  }
})();

/*===== FORM SUBMISSION =====*/
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    /* ===== VALIDATION ===== */
    if (name.length < 3) {
      window.showToast('O nome deve ter pelo menos 3 caracteres.', 'warning');
      nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.showToast('Por favor, insira um email válido.', 'warning');
      emailInput.focus();
      return;
    }

    if (message.length < 10) {
      window.showToast('A mensagem deve ter pelo menos 10 caracteres.', 'warning');
      messageInput.focus();
      return;
    }

    /* ===== LOADING STATE ===== */
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    /* ===== TEMPLATE PARAMS ===== */
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'duuh.dorneles@gmail.com',
      reply_to: email,
    };

    console.log('[EmailJS] Enviando email com params:', templateParams);

    /* ===== SEND EMAIL ===== */
    emailjs.send('service_3ty33uj', 'template_a3yj6an', templateParams)
      .then(function (response) {
        console.log('[EmailJS] Sucesso:', response.status, response.text);
        window.showToast('✅ Email enviado com sucesso! Retornarei em breve.', 'success');
        contactForm.reset();
      })
      .catch(function (error) {
        console.error('[EmailJS] Erro no envio:', error);
        
        let errorMsg = 'Erro ao enviar email. ';
        
        if (error.status === 400) {
          errorMsg += 'Verifique a configuração do template no EmailJS.';
        } else if (error.status === 401 || error.status === 403) {
          errorMsg += 'Chave pública inválida ou serviço desconectado.';
        } else if (error.status === 422) {
          errorMsg += 'Dados inválidos. Verifique os campos do formulário.';
        } else if (error.status === 429) {
          errorMsg += 'Limite de envios atingido. Tente novamente mais tarde.';
        } else {
          errorMsg += 'Tente novamente ou envie diretamente para duuh.dorneles@gmail.com';
        }
        
        window.showToast(errorMsg, 'error');
      })
      .finally(function () {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      });
  });
}