    cor = new Array();     
    cor[0] = "#FF0000";    
    cor[1] = "#006600";    
    cor[2] = "#0000FF";    
    cor[3] = "#FF00FF";    
    cor[4] = "#FF9900";    
    cor[5] = "#000000";    

    nivel = 1;        
    Pensar();        
    partidas = 1;   

    limite = new Array();  
    limite[1] = 10;         // 10 chances no nível facil
    limite[2] = 12;         // 12 chances no nivel médio
    limite[3] = 14;         // 14 chances no nível difícil


    
    function Pensar() {
      indice = nivel * 1 + 2;                            
      bloco1 = cor[Math.round(Math.random() * indice)];  
      bloco2 = cor[Math.round(Math.random() * indice)];
      bloco3 = cor[Math.round(Math.random() * indice)];
      bloco4 = cor[Math.round(Math.random() * indice)];
    }

    function Jogar() {
      nivel = document.jogo.nivel.value;   
      erro = 0;                            

      var primeiro = document.getElementsByTagName("select")[4 * nivel - 3].value;   
      var segundo = document.getElementsByTagName("select")[4 * nivel - 2].value;    
      var terceiro = document.getElementsByTagName("select")[4 * nivel - 1].value;  
      var quarto = document.getElementsByTagName("select")[4 * nivel].value;         


      
      if (primeiro == "-") {
        alert("Selecione a cor do primeiro bloco");
        document.getElementsByTagName("select")[4 * nivel - 3].focus();
        return false;
      }
      if (segundo == "-") {
        alert("Selecione a cor do segundo bloco");
        document.getElementsByTagName("select")[4 * nivel - 2].focus();
        return false;
      }
      if (terceiro == "-") {
        alert("Selecione a cor do terceiro bloco");
        document.getElementsByTagName("select")[4 * nivel - 1].focus();
        return false;
      }
      if (quarto == "-") {
        alert("Selecione a cor do quarto bloco");
        document.getElementsByTagName("select")[4 * nivel].focus();
        return false;
      }

     
      document.getElementById("status").innerHTML += "<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + primeiro + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + segundo + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + terceiro + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + quarto + "'></button>&nbsp;&nbsp;&nbsp;&nbsp;";

      
      if (primeiro != bloco1) {
        erro++;                 
      }
      if (segundo != bloco2) {
        erro++;
      }
      if (terceiro != bloco3) {
        erro++;
      }
      if (quarto != bloco4) {
        erro++;
      }

      chances = limite[nivel] - partidas; 

    

    
      if (erro == 0 && partidas != 1) {
        document.getElementById("status").innerHTML += "<i>ACERTOU em " + partidas + " partidas!</i>";
        HabilitarBotoes(false);
        alert("Parabéns! Tente novamente!")
      }

             else if (erro == 0 && partidas == 1) {          
        document.getElementById("status").innerHTML += "<i>ACERTOU em apenas 1 partida!\nIsso � pura sorte!</i>";
        HabilitarBotoes(false);
        alert("Parabéns! Continue assim!")
      }

      // CASO 3: Apenas 1 bloco errado. Escrever no singular.
      else if (erro == 1) {
        document.getElementById("status").innerHTML += "1 erro. Chances: " + chances + "<br /><br />";
      }

      // CASO 4: Mais de um bloco errado. Escrever no plural.
      else {
        document.getElementById("status").innerHTML += erro + " erros. Chances: " + chances + "<br /><br />";
      }

      Rolar();  

      if (partidas == limite[nivel] && erro != 0) {
        // Chances esgotadas, game over!          

        alert("Suas tentativas se esgotaram. Fim de jogo!");
        return SequenciaCorreta();   // Mostra qual era a resposta correta
      }
      partidas++;   // Ainda n�o acertou, assim soma o n�mero de partidas jogadas
    }

    function Desistir() {
      confirma = window.confirm("Tem certeza?");
      if (confirma) {
        SequenciaCorreta();   
      }
      else {
        return false;
      }
    }

    function NovaPartida() {
      HabilitarBotoes(true);                              
      partidas = 0;                                     
      Pensar();                                           
      Jogar();                                            
      document.getElementById("status").innerHTML = "";   
    }

    function ConfirmarNovaPartida() {
      confirma = window.confirm("Começar novo jogo?");    
      if (confirma) {                                     
        NovaPartida(); 
      }
      else {
        return false;
      }      
    }

    function SequenciaCorreta() {      
      document.getElementById("status").innerHTML += "<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + bloco1 + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + bloco2 + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + bloco3 + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + bloco4 + "'></button>&nbsp;&nbsp;&nbsp;&nbsp;<i>Esta era a sequência correta</i>";        
      HabilitarBotoes(false);       
      Rolar();
    }

    function MudarNivel() {
      nivel = document.jogo.nivel.value;              

      if (nivel == 1) {
        document.getElementById("facil").style.display = "inline";    // Atualiza campos <select>, com as novas cores
        document.getElementById("medio").style.display = "none";
        document.getElementById("dificil").style.display = "none";
      }
      else if (nivel == 2) {
        document.getElementById("facil").style.display = "none";
        document.getElementById("medio").style.display = "inline";
        document.getElementById("dificil").style.display = "none";
      }
      else {
        document.getElementById("facil").style.display = "none";
        document.getElementById("medio").style.display = "none";
        document.getElementById("dificil").style.display = "inline";
      }

      n = new Array();   
      n[1] = "facil";
      n[2] = "medio";
      n[3] = "dificil";

      alert("O nível foi alterado para " + n[nivel]);
      NovaPartida();     
      partidas = 1;      
    }

    function HabilitarBotoes(r) {
      if (r) {
        document.jogo.ok.disabled = false;              
        document.jogo.desistir.disabled = false;       
      }
      else {
        document.jogo.ok.disabled = "disabled";         
        document.jogo.desistir.disabled = "disabled";   
      }
    }

    function Rolar() {
      document.getElementById("status").scrollTop = 1000000;
    }

  