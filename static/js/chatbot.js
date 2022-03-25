function rolarScroolContainderChat(){
    $("#container-chat").animate({
    scrollTop: $('#container-chat')[0].scrollHeight - $('#container-chat')[0].clientHeight
    }, 1000);
}

function renderizarWidgetMensagemChat(usuarioOrigem, mensagem) {
    if (usuarioOrigem == 'bot') {
        icone = 'robot';
        posicao = 'right-0 ';
        cor = 'success';
    } else {
        icone = 'person-fill';
        posicao = 'left-0';
        cor = 'info';
    }

    var widget_mensagem = `<br><br>
                           <div class="badge bg-${cor} bg-gradient text-wrap text-left position-absolute ${posicao}-0 start-0 mt-3">
                            <i class="bi bi-${icone}"style="font-size: 1rem; color: white;"></i>
                            ${mensagem}
                           </div>`;

    $('#container-chat').append(widget_mensagem);

    rolarScroolContainderChat();
}

function btnEnviarPergunta(pergunta){
    if(pergunta){
        renderizarWidgetMensagemChat('usuario', pergunta);
        $.getJSON($SCRIPT_ROOT + '/chatbot', {
            pergunta: pergunta
        }, function(data) {
            renderizarWidgetMensagemChat('bot', data.resposta);
        });
        return false;
    }
}