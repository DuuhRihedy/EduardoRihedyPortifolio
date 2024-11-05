(function() {
    emailjs.init("cZSIscmBXxL2LxzO8");
  })();

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impedir o envio padrão do formulário

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    if(name.length < 3){
        return alert('O campo nome deve ter de 3 a 255 caracateres');
    }
    if(!email){
        return alert('Digite um email valido');
    }
    if(message.length < 10){
        return alert('A menssagem deve ter de 10 a 1500 caracteres');
    }

    emailjs.send("service_3ty33uj", "template_a3yj6an", templateParams)
      .then(function(response) {
        alert("E-mail enviado com sucesso!");
        document.getElementById("contactForm").reset(); // Limpar o formulário
      }, function(error) {
        alert("Erro ao enviar o e-mail, tente novamente.");
        console.error("Erro:", error);
      });
  });