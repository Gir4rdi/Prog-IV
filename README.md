# Prog-IV<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Supernatural Wiki</title>

  <style>
    body {
      margin: 0;
      font-family: Georgia, serif;
      background: #111;
      color: #eee;
    }

    .parallax-container {
      position: relative;
      height: 320px;
      overflow: hidden;
      background: linear-gradient(#050505, #1a1a1a);
      border-bottom: 3px solid #6b0000;
      cursor: pointer;
    }

    .layer {
      position: absolute;
      inset: 0;
      transition: transform 0.2s ease-out;
    }

    .lua {
      width: 90px;
      height: 90px;
      background: #d6d6d6;
      border-radius: 50%;
      top: 45px;
      left: 70%;
      box-shadow: 0 0 35px #fff;
    }

    .neblina {
      background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 65%);
      filter: blur(18px);
    }

    .floresta {
      top: auto;
      bottom: 0;
      height: 170px;
      background: linear-gradient(transparent, #000),
                  repeating-linear-gradient(90deg, #050505 0 20px, #111 20px 40px);
    }

    .simbolo {
      color: #6b0000;
      font-size: 140px;
      text-align: center;
      top: 80px;
      opacity: 0.45;
    }

    .parallax-container.ativo .simbolo {
      color: #d6b35a;
      transform: scale(1.2) rotate(20deg);
    }

    header {
      background: #1f1f1f;
      color: #d6b35a;
      padding: 25px;
      text-align: center;
      border-bottom: 3px solid #6b0000;
    }

    .glitch {
      position: relative;
      font-size: 48px;
      animation: glitchAnim 1s infinite;
      text-shadow: 2px 2px #6b0000, -2px -2px #333;
    }

    @keyframes glitchAnim {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(2px, -2px); }
      60% { transform: translate(-1px, 1px); }
      80% { transform: translate(1px, -1px); }
      100% { transform: translate(0); }
    }

    #textoDigitando {
      color: #ccc;
      font-size: 20px;
      min-height: 30px;
      border-right: 2px solid #d6b35a;
      display: inline-block;
      padding-right: 5px;
    }

    nav a {
      color: #d6b35a;
      margin: 0 10px;
      text-decoration: none;
      transition: 0.3s;
    }

    nav a:hover {
      color: #ff3333;
    }

    main {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      padding: 20px;
    }

    section, article, aside {
      background: #1c1c1c;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px #000;
    }

    img {
      width: 100%;
      border-radius: 10px;
      transition: 0.4s;
    }

    img:hover {
      transform: scale(1.03);
    }

    figure {
      margin: 0;
    }

    figcaption {
      text-align: center;
      font-size: 14px;
      color: #d6b35a;
      margin-top: 5px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      border: 1px solid #555;
      padding: 8px;
      text-align: center;
    }

    th {
      background: #3a0000;
      color: #d6b35a;
    }

    .destaque {
      color: #d6b35a;
      font-weight: bold;
    }

    #curiosidade {
      background: #2a2a2a;
      padding: 10px;
      border-left: 5px solid #6b0000;
    }

    button {
      padding: 10px 15px;
      background: #6b0000;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s;
      margin: 5px;
    }

    button:hover {
      background: #a30000;
      transform: scale(1.05);
    }

    footer {
      text-align: center;
      background: #1f1f1f;
      color: #d6b35a;
      padding: 15px;
      margin-top: 20px;
      border-top: 3px solid #6b0000;
    }
  </style>
</head>

<body>

  <audio id="somTema" src="https://www.soundjay.com/human/sounds/scream-01.mp3"></audio>

  <div class="parallax-container" id="parallax">
    <div class="layer lua" data-speed="0.02"></div>
    <div class="layer neblina" data-speed="0.04"></div>
    <div class="layer floresta" data-speed="0.07"></div>
    <div class="layer simbolo" data-speed="0.10">✦</div>
  </div>

  <header>
    <h1 class="glitch">Supernatural Wiki</h1>
    <h2 id="textoDigitando"></h2>
  </header>

  <main>
    <div>
      <section id="historia">
        <h2>História da série</h2>

        <article>
          <h3>Resumo</h3>

          <p>
            <span class="destaque">Supernatural</span> acompanha os irmãos Winchester
            em caçadas contra criaturas sobrenaturais.
          </p>

          <!-- 🔥 NOVA IMAGEM DO IMPALA -->
          <figure>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/1967_Chevrolet_Impala_black.jpg" alt="Chevrolet Impala 1967 do Dean Winchester">
            <figcaption>O icônico Impala 1967, conhecido como "Baby".</figcaption>
          </figure>

          <p>
            O carro é praticamente um personagem da série, acompanhando os irmãos
            em todas as suas jornadas.
          </p>
        </article>
      </section>
    </div>

    <aside>
      <h2>Área interativa</h2>

      <p id="curiosidade">
        Clique no botão para revelar uma curiosidade sobrenatural.
      </p>

      <button id="botaoCuriosidade">Mostrar curiosidade</button>
      <button id="botaoSom">Tocar som</button>
    </aside>
  </main>

  <footer>
    <p>Projeto de Desenvolvimento Web — Wiki Interativa</p>
  </footer>

  <script>
    const texto = "Mini enciclopédia sobrenatural...";
    const textoDigitando = document.getElementById("textoDigitando");
    let i = 0;

    function digitar() {
      if (i < texto.length) {
        textoDigitando.textContent += texto.charAt(i);
        i++;
        setTimeout(digitar, 70);
      }
    }
    digitar();

    document.getElementById("botaoCuriosidade").onclick = () => {
      document.getElementById("curiosidade").textContent =
        "O Impala aparece em praticamente todos os episódios da série.";
    };

    document.getElementById("botaoSom").onclick = () => {
      document.getElementById("somTema").play();
    };

    const parallax = document.getElementById("parallax");
    const layers = document.querySelectorAll(".layer");

    parallax.addEventListener("mousemove", e => {
      const x = e.offsetX - parallax.offsetWidth/2;
      const y = e.offsetY - parallax.offsetHeight/2;

      layers.forEach(layer => {
        const speed = layer.dataset.speed;
        layer.style.transform = `translate(${x*speed}px, ${y*speed}px)`;
      });
    });

    parallax.addEventListener("mouseleave", () => {
      layers.forEach(layer => layer.style.transform = "translate(0,0)");
    });

    parallax.addEventListener("click", () => {
      parallax.classList.toggle("ativo");
    });
  </script>

</body>
</html>
