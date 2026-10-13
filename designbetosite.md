# Design System — uxbeto (motor-holly-65846052.figma.site)

> Auditoria visual extraída diretamente do site publicado (screenshots + computed styles via DevTools).
> Data da análise: 21/08/2026.

---

## 1. Personalidade visual (leitura qualitativa)

Editorial, minimalista e "confiante silenciosa". A página usa muito espaço em branco, tipografia grande em preto-e-branco e um único acento de cor (azul elétrico) para pontuar exatamente as palavras que importam — "with pride.", por exemplo. A textura vem de fotos em preto e branco (alto contraste, quase editorial de revista) e de uma palavra gigante em outline cinza-claro atrás do retrato, criando profundidade sem poluir. O tom geral é sério e profissional, mas não corporativo-frio: o logo é uma "flor" orgânica, o cursor tem uma leve interação, e a seção final ("tks to read about me :)") quebra a formalidade com um gesto pessoal e bem-humorado.

Palavras-chave: editorial, monocromático + 1 acento, tipografia como hero, respiração generosa, contraste alto, sutileza cinética (marquee lento), assinatura pessoal.

---

## 2. Paleta de cores

### Neutros (base do sistema)
| Uso | Valor | Hex aprox. |
|---|---|---|
| Preto puro (texto, fundo da navbar, botões) | `rgb(0,0,0)` | `#000000` |
| Branco puro (texto sobre preto, fundos) | `rgb(255,255,255)` | `#FFFFFF` |
| Cinza texto secundário | `rgb(118,118,118)` | `#767676` |
| Cinza texto/label | `rgb(79,79,79)` | `#4F4F4F` |
| Quase-preto (texto sobre bege) | `rgb(20,20,19)` | `#141413` |
| Azul-marinho escuro (texto de apoio) | `rgb(33,39,62)` | `#21273E` |
| Cinza claro (heading gigante em outline) | `rgb(235,235,235)` | `#EBEBEB` |
| Fundo off-white principal | `rgb(250,250,250)` | `#FAFAFA` |
| Fundo off-white quente | `rgb(250,249,245)` | `#FAF9F5` |
| Fundo cinza claro secundário | `rgb(245,245,245)` | `#F5F5F5` |
| Overlay cinza translúcido | `rgba(95,95,95,0.2)` | — |
| Preto translúcido (texto sutil) | `rgba(0,0,0,0.6)` | — |

### Acento
| Uso | Valor | Hex aprox. |
|---|---|---|
| **Azul elétrico** — único acento de cor, usado em palavras-chave ("with pride.") e em links | `rgb(11,15,255)` | `#0B0FFF` |
| Bege/terracota quente — fundo do card de bio | `rgb(213,201,191)` | `#D5C9BF` |
| Laranja-terracota — glow/shadow decorativo (efeito de destaque, provavelmente em elemento interativo/CTA) | `rgba(217,119,87, 0.2–0.7)` | `#D97757` |

### Bordas
- `1px solid rgba(0,0,0,0.1)` — divisórias sutis entre seções
- `0.5px solid rgba(31,30,29,0.4)` — bordas finas em cards/linhas de stats

**Regra de uso:** paleta essencialmente monocromática (preto/branco/cinzas + bege quente pontual) com **um único acento saturado** (azul `#0B0FFF`) reservado para grifar 1–3 palavras por seção. Isso mantém a hierarquia extremamente clara — o olho vai direto ao azul.

---

## 3. Tipografia

### Famílias identificadas
- **Inter** (Regular / Medium / Semi Bold / Bold) — usada em UI: nav, botões, textos de corpo, marquee.
- **Instrument Sans** (Regular / Medium) — usada nos **headlines/display**, dá o tom editorial (ex.: "Turning complex problems into intuitive, high-performing digital experiences — with pride.").
- **Oxygen** (Regular / Bold) — aparece em labels específicos (ex. "Product Design" acima do nome).
- Fallback do sistema: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, ...`

### Escala tipográfica (tamanhos observados)
| Papel | Fonte | Tamanho | Peso | Cor | Letter-spacing | Line-height |
|---|---|---|---|---|---|---|
| Heading gigante decorativo ("Product / Designer" atrás do retrato) | Inter Regular | **184.8px** | 400 | `#EBEBEB` (outline sutil) | normal | normal |
| Headline principal (hero) | Instrument Sans Regular | **64px** | 400 | `#767676` (texto base) / `#0B0FFF` (palavra de destaque) | **-2.048px** (tracking bem negativo) | 70.4px (~1.1×) |
| Corpo / nav / botões | Inter Medium/Regular | 16px | 400–500 | preto/branco conforme fundo | -0.08px | normal |
| Label pequena (Oxygen) | Oxygen Regular | 16px | 400 | `#4F4F4F` | — | — |

**Padrão-chave:** títulos grandes usam **tracking negativo agressivo** (-2px em 64px, proporcionalmente ~-3.2%) — típico de tipografia editorial moderna (estilo "Big Tech / SF Pro condensado"). Textos de UI (nav, botões) usam tracking quase neutro (-0.08px).

### Hierarquia de peso
- 400 (Regular) para leitura longa e headlines
- 500 (Medium) para links de navegação
- 600–700 (Semi Bold/Bold) reservados para pontos de ênfase (nomes de certificações, números de estatísticas)

---

## 4. Layout & Grid

- Largura de conteúdo (barra preta do header): **983px** dentro de um viewport de ~1126px → indica um container centralizado com margens laterais generosas (não full-bleed).
- Header/nav: altura ~119px, fundo transparente na tag `<nav>`, mas com uma **barra preta arredondada** (`border-radius: 16px`) contendo logo + links + CTA — um "floating pill nav".
- Seções empilhadas verticalmente com divisórias finas (`border: 1px solid rgba(0,0,0,0.1)`) em vez de blocos de cor — reforça o tom editorial/minimalista.
- Fotos com **máscara circular quase perfeita** (`border-radius: 130.883px` em elemento não-quadrado = elipse/círculo responsivo).
- Cards/imagens de projeto: `border-radius: 16px` (às vezes assimétrico `16px 0 0 16px` para imagens que "saem" do card).
- Botões e badges menores: `border-radius: 8px` e `12px`.
- Altura total da página: ~4385px (long-scroll, storytelling em uma única página).

---

## 5. Componentes

### Navbar ("pill" flutuante)
- Fundo preto (`#000`), cantos `16px`, sem padding extra no `<nav>` (padding fica nos filhos).
- Logo: ícone orgânico tipo "flor" branca (5 pétalas irregulares) + wordmark "I'm Beto." em branco.
- Link "About me": branco, Inter Medium 500, sublinhado, 16px.
- Botão "Talk to me": fundo branco, texto preto, `border-radius: 8px`, `padding: 8px 12px`, `transition: all` (hover suave, provavelmente opacidade/escala).

### Marquee (ticker de texto infinito)
- Classe `.marquee`, animação CSS `@keyframes scroll` — **linear, infinite, duração ≈ 13.87s**.
- Texto repetido em loop: "Designed 20+ end-to-end systems, transforming complex business needs into intuitive experiences and implementation-ready design solutions."
- Fonte do sistema, 16px, preto — textura de fundo constante, não é foco visual, é ambiente.
- Existe uma classe adicional `reduced-motion` no mesmo elemento, sinal de que o site **respeita `prefers-reduced-motion`** (boa prática de acessibilidade).

### Heading decorativo em outline
- Palavra grande (184px) atrás do retrato em cinza muito claro (`#EBEBEB`), criando um efeito de "marca d'água" tipográfica que dá profundidade sem competir com o conteúdo real.

### Cards (bio / "with pride")
- Fundo bege quente (`#D5C9BF`) com texto quase-preto (`#141413`) — o único bloco de cor sólida "quente" da página, usado para humanizar a seção de bio/depoimento.

### Stats ("20+ systems", "10+ Discovery...", "3+ Leadership")
- Números grandes, label pequena abaixo, separados por linha fina (`border-bottom` sutil) — padrão "linha divisória minimalista" em vez de cards com fundo.

### Shadows / Glow (efeito decorativo raro)
- Encontrado um glow terracota em camadas (provavelmente hover/focus de um elemento interativo destacado):
  - `inset`: `rgba(217,119,87,.7) 0 0 15px, rgba(217,119,87,.5) 0 0 25px, rgba(217,119,87,.2) 0 0 35px`
  - `drop`: `rgba(217,119,87,.24) 0 40px 80px, rgba(217,119,87,.24) 0 4px 14px`
- Efeito usado com moderação — provavelmente um "spotlight" ou glow ambiente por trás de uma imagem/CTA, nunca em bordas de botões comuns.

---

## 6. Animação & Interação

| Elemento | Tipo | Timing |
|---|---|---|
| Marquee de texto (hero) | `transform: translateX` contínuo | linear, infinite, ~13.9s por ciclo |
| Botões/links | `transition: all` (genérico, sugere hover em cor/bg/opacidade) | duração não capturada nos computed styles estáticos, mas classe `transition: all` presente em CTA e nav link |
| Acessibilidade | classe `.reduced-motion` acoplada ao marquee | resposta a `prefers-reduced-motion` |

Não foram encontradas outras `@keyframes` autorais na página além do marquee (o `claude-pulse` identificado é injetado pela extensão do navegador, não faz parte do site).

---

## 7. Imagens / Fotografia

- Fotografia em **preto e branco**, alto contraste, enquadramento de perfil (editorial/revista) — usada no hero.
- Fotos de "sobre mim" e certificações: também em tom monocromático/dessaturado, mantendo consistência com a paleta neutra.
- Mockups de projeto (dashboards): esses sim coloridos (azul, magenta, ciano) — contraste proposital entre o "invólucro" pessoal (P&B) e o "conteúdo de trabalho" (colorido), sinalizando que a cor pertence ao produto, não à marca pessoal.

---

## 8. Tom de voz / Copy (para referência de conteúdo)

- Frases curtas, em primeira pessoa, comprimidas na tipografia grande ("Turning complex problems into intuitive, high-performing digital experiences — with pride.").
- Números como prova social ("20+ systems", "10+ Discovery and facilitations", "3+ Leadership...").
- Fechamento pessoal e informal: "tks to read about me :)" — quebra proposital do tom formal para gerar simpatia.

---

## 9. Tokens sugeridos (para reuso em outro projeto/design.md formal)

```
--color-bg-primary:        #FAFAFA;
--color-bg-warm:           #FAF9F5;
--color-bg-muted:          #F5F5F5;
--color-bg-accent-warm:    #D5C9BF;  /* card bege */
--color-text-primary:      #000000;
--color-text-secondary:    #767676;
--color-text-tertiary:     #4F4F4F;
--color-text-on-warm:      #141413;
--color-text-navy:         #21273E;
--color-outline-heading:   #EBEBEB;
--color-accent:            #0B0FFF;  /* único acento saturado */
--color-glow-accent:       #D97757;  /* uso raro, glow decorativo */

--font-display: "Instrument Sans", sans-serif;   /* headlines, tracking negativo */
--font-body:    "Inter", sans-serif;             /* UI, nav, corpo */
--font-label:   "Oxygen", sans-serif;            /* labels pontuais */

--size-display-xl: 184px;  /* heading decorativo de fundo */
--size-display-lg: 64px;   /* headline hero, tracking -2.048px */
--size-body: 16px;

--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 130px; /* círculo de foto */

--border-hairline: 1px solid rgba(0,0,0,0.1);
--border-hairline-alt: 0.5px solid rgba(31,30,29,0.4);

--marquee-duration: 13.87s linear infinite;
```

---

*Fonte: análise ao vivo da página https://motor-holly-65846052.figma.site/ via inspeção de computed styles, screenshots e leitura de DOM. Cores e tamanhos são aproximados aos valores computados pelo navegador no momento da análise.*
