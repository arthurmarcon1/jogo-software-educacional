document.addEventListener('DOMContentLoaded', () => {
    // Sistema da Pirâmide Alimentar
    const setupPyramid = () => {
        const pyramidLevels = document.querySelectorAll('.pyramid-level');
        const foodExamples = document.getElementById('foodExamples');
        const levelTitle = document.getElementById('levelTitle');
        const levelContent = document.getElementById('levelContent');
        const foodIcons = document.getElementById('foodIcons');
        
        // Dados para cada nível da pirâmide com emojis
        const pyramidData = {
            1: {
                title: "🌾 Grãos e Cereais",
                description: "Formam a base da pirâmide e devem ser consumidos em maior quantidade. São fonte de carboidratos complexos, fibras, vitaminas do complexo B e minerais.",
                examples: [
                    {name: "Arroz Integral", emoji: "🍚"},
                    {name: "Pão Integral", emoji: "🍞"},
                    {name: "Aveia", emoji: "🥣"},
                    {name: "Quinoa", emoji: "🌾"},
                    {name: "Macarrão Integral", emoji: "🍝"}
                ],
                servings: "6-11 porções diárias"
            },
            2: {
                title: "🍎 Frutas e Vegetais",
                description: "Ricos em vitaminas, minerais, fibras e antioxidantes. Consuma variedade de cores para obter diferentes nutrientes.",
                examples: [
                    {name: "Maçã", emoji: "🍏"},
                    {name: "Brócolis", emoji: "🥦"},
                    {name: "Cenoura", emoji: "🥕"},
                    {name: "Banana", emoji: "🍌"},
                    {name: "Tomate", emoji: "🍅"}
                ],
                servings: "3-5 porções de vegetais e 2-4 de frutas"
            },
            3: {
                title: "🍗 Proteínas",
                description: "Essenciais para construção e reparo dos tecidos. Inclua fontes magras e varie entre animal e vegetal.",
                examples: [
                    {name: "Frango", emoji: "🍗"},
                    {name: "Feijão", emoji: "🫘"},
                    {name: "Ovos", emoji: "🥚"},
                    {name: "Peixe", emoji: "🐟"},
                    {name: "Nozes", emoji: "🥜"}
                ],
                servings: "2-3 porções diárias"
            },
            4: {
                title: "🥛 Lácteos",
                description: "Importantes para saúde óssea por fornecerem cálcio. Opte por versões com baixo teor de gordura.",
                examples: [
                    {name: "Leite", emoji: "🥛"},
                    {name: "Queijo", emoji: "🧀"},
                    {name: "Iogurte", emoji: "🍶"},
                    {name: "Coalhada", emoji: "🫙"},
                    {name: "Requeijão", emoji: "🧈"}
                ],
                servings: "2-3 porções diárias"
            },
            5: {
                title: "🫒 Gorduras e Óleos",
                description: "Necessários em pequenas quantidades. Prefira fontes de gorduras insaturadas como azeite, abacate e oleaginosas.",
                examples: [
                    {name: "Azeite", emoji: "🫒"},
                    {name: "Abacate", emoji: "🥑"},
                    {name: "Nozes", emoji: "🌰"},
                    {name: "Salmão", emoji: "🐟"},
                    {name: "Sementes", emoji: "🌱"}
                ],
                servings: "Use com moderação"
            },
            6: {
                title: "🍬 Doces e Açúcares",
                description: "Devem ser consumidos ocasionalmente. Alto teor calórico com baixo valor nutricional.",
                examples: [
                    {name: "Chocolate", emoji: "🍫"},
                    {name: "Biscoitos", emoji: "🍪"},
                    {name: "Bolo", emoji: "🍰"},
                    {name: "Sorvete", emoji: "🍦"},
                    {name: "Bala", emoji: "🍭"}
                ],
                servings: "Ocasionalmente"
            }
        };
        
        pyramidLevels.forEach(level => {
            level.addEventListener('click', function() {
                const levelNum = this.getAttribute('data-level');
                const data = pyramidData[levelNum];
                
                levelTitle.textContent = data.title;
                levelContent.innerHTML = `
                    <p>${data.description}</p>
                    <p><strong>Porções recomendadas:</strong> ${data.servings}</p>
                `;
                
                foodIcons.innerHTML = '';
                data.examples.forEach(food => {
                    const foodIcon = document.createElement('div');
                    foodIcon.className = 'food-icon';
                    foodIcon.innerHTML = `
                        <div class="food-emoji">${food.emoji}</div>
                        <span>${food.name}</span>
                    `;
                    foodIcons.appendChild(foodIcon);
                });
                
                foodExamples.classList.add('active');
            });
        });
        
        // Mostra o primeiro nível por padrão
        pyramidLevels[0].click();
    };

    const gameRules = `
    🏆 REGRAS DO JOGO 🏆

    1. INTERAÇÃO COM O CLIENTE:
    - Cada cliente chegará com um pedido específico
    - Pode ser:
        * Uma restrição alimentar (sem glúten, sem lactose, etc.)
        * Um objetivo nutricional (emagrecimento, ganho muscular)
        * Uma preferência dietética (vegano, low-carb, etc.)

    2. MONTAGEM DO PRATO:
    - Você verá uma seleção de ingredientes disponíveis
    - Deve combinar os ingredientes corretamente para atender ao pedido
    - Alguns ingredientes podem ser incompatíveis com certas restrições

    3. PONTUAÇÃO:
    - Acerto perfeito: 100 pontos (todos os critérios atendidos)
    - Acerto parcial: 50 pontos (alguns critérios atendidos)
    - Erro: 0 pontos (não atendeu ao pedido)

    4. NÍVEIS DE DIFICULDADE:
    - Iniciante: 3-4 ingredientes, 1 restrição
    - Intermediário: 5-6 ingredientes, 2 restrições
    - Avançado: 7+ ingredientes, múltiplas restrições

    5. BÔNUS:
    - Combinações criativas podem render pontos extras
    - Sequências de acertos dão multiplicadores

    DICA: Preste atenção nas informações nutricionais dos ingredientes e nas necessidades do cliente!
    `;

    // Event Listener para o botão de regras
    document.getElementById('rulesBtn')?.addEventListener('click', () => {
        // Usando SweetAlert2 para um popup mais bonito (opcional)
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Regras do Jogo',
                html: gameRules.replace(/\n/g, '<br>'),
                icon: 'info',
                background: 'rgba(0, 0, 0, 0.8)',
                backdrop: 'rgba(255, 255, 255, 0.1)',
                confirmButtonColor: '#88d498',
                customClass: {
                    popup: 'glass-popup'
                }
            });
        } else {
            // Fallback para o prompt padrão se SweetAlert2 não estiver disponível
            alert(gameRules);
        }
    });
    // Sistema de Progresso (melhorado)
    const userProgress = {
        level: 1,
        completedRecipes: 3,
        achievements: [
            { name: 'Iniciante', icon: 'bi-emoji-smile', color: 'primary' },
            { name: '5 Receitas', icon: 'bi-book', color: 'success' },
            { name: 'Chef Novato', icon: 'bi-award', color: 'warning' }
        ],
        progress: 25
    };

    const updateProgress = () => {
        const progressBar = document.getElementById('mainProgress');
        progressBar.style.width = `${userProgress.progress}%`;
        progressBar.textContent = `${userProgress.progress}%`;
        
        // Adiciona classes de cor baseado no progresso
        if (userProgress.progress < 30) {
            progressBar.className = 'progress-bar bg-danger';
        } else if (userProgress.progress < 70) {
            progressBar.className = 'progress-bar bg-warning';
        } else {
            progressBar.className = 'progress-bar bg-success';
        }
        
        document.getElementById('achievements').innerHTML = userProgress.achievements.map(ach => `
            <span class="badge bg-${ach.color} me-2 mb-2">
                <i class="bi ${ach.icon}"></i> ${ach.name}
            </span>
        `).join('');
    };

    // Carregar Receitas (melhorado com fallback)
    const loadRecipes = async () => {
    // Receitas padrão (fallback)
    const defaultRecipes = [
        {
            "name": "Arroz Integral com Vegetais",
            "description": "Arroz integral energético acompanhado de cenoura e ervilhas, rico em fibras e vitaminas.",
            "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            "time": 35,
            "servings": 4,
            "difficulty": "Fácil"
        },
        {
            "name": "Salada Colorida com Molho de Iogurte",
            "description": "Salada fresca com beterraba, pepino e molho cremoso de iogurte e limão, cheia de antioxidantes.",
            "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
            "time": 15,
            "servings": 3,
            "difficulty": "Fácil"
        },
        {
            "name": "Hambúrguer de Feijão Preto",
            "description": "Hambúrguer vegetariano proteico feito com feijão preto e aveia, assado e sem óleo.",
            "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
            "time": 30,
            "servings": 4,
            "difficulty": "Médio"
        },
        {
            "name": "Smoothie de Banana com Leite Vegetal",
            "description": "Bebida cremosa com banana, leite de amêndoas e chia, fonte de cálcio e ômega-3.",
            "image": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
            "time": 5,
            "servings": 2,
            "difficulty": "Fácil"
        },
        {
            "name": "Pasta de Abacate com Torradas Integrais",
            "description": "Pasta cremosa de abacate temperada com limão e azeite, perfeita para lanches rápidos e saudáveis.",
            "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
            "time": 10,
            "servings": 2,
            "difficulty": "Fácil"
        },
        {
            "name": "Cookies de Aveia e Mel",
            "description": "Cookies sem açúcar refinado, adoçados com banana e mel, ideais para um lanche nutritivo.",
            "image": "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
            "time": 25,
            "servings": 12,
            "difficulty": "Fácil"
        }
    ];

    let recipes = [];
    
    try {
        const response = await fetch('data/recipes.json');
        if (!response.ok) throw new Error('Falha ao carregar receitas');
        recipes = await response.json();
    } catch (error) {
        console.error('Erro ao carregar receitas, usando fallback:', error);
        recipes = defaultRecipes;
    }

    if (!recipes || recipes.length === 0) {
        recipes = defaultRecipes;
    }

    const carouselInner = document.getElementById('carouselItems');
    carouselInner.innerHTML = '';
    
    recipes.forEach((recipe, index) => {
        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `
            <img src="${recipe.image}" class="d-block w-100" alt="${recipe.name}">
            <div class="carousel-caption">
                <h5>${recipe.name}</h5>
                <p>${recipe.description}</p>
                <div class="d-flex justify-content-center gap-3 small mt-2">
                    <span><i class="bi bi-clock"></i> ${recipe.time} min</span>
                    <span><i class="bi bi-people"></i> ${recipe.servings} porções</span>
                    <span><i class="bi bi-star"></i> ${recipe.difficulty}</span>
                </div>
            </div>
        `;
        carouselInner.appendChild(item);
    });
    
    if (recipes.length > 1) {
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        recipes.forEach((_, i) => {
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.dataset.bsTarget = '#recipeCarousel';
            indicator.dataset.bsSlideTo = i.toString();
            indicator.setAttribute('aria-label', `Slide ${i+1}`);
            if (i === 0) {
                indicator.className = 'active';
                indicator.setAttribute('aria-current', 'true');
            }
            indicators.appendChild(indicator);
        });
        document.getElementById('recipeCarousel').prepend(indicators);
    }

    // Inicializa o carrossel
    if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
        new bootstrap.Carousel(document.getElementById('recipeCarousel'), {
            interval: 5000,
            ride: 'carousel'
        });
    }
};

    // Sistema de Quiz (melhorado)
    const quiz = [
        {
        question: "Qual vitamina é mais importante para a saúde dos ossos?",
        options: ["Vitamina C", "Vitamina D", "Vitamina B12"],
        answer: 1,
        explanation: "A vitamina D ajuda o corpo a absorver cálcio, essencial para ossos fortes."
        },
        {
            question: "Qual desses alimentos é a melhor fonte de proteína?",
            options: ["Maçã", "Frango", "Arroz branco"],
            answer: 1,
            explanation: "O frango é rico em proteínas, importantes para o crescimento e reparo dos músculos."
        },
        {
            question: "Qual mineral previne a anemia e está presente no feijão?",
            options: ["Cálcio", "Ferro", "Potássio"],
            answer: 1,
            explanation: "O ferro ajuda a formar hemoglobina, que transporta oxigênio no sangue."
        },
        {
            question: "Qual desses alimentos contém mais fibras?",
            options: ["Pão branco", "Maçã com casca", "Refrigerante"],
            answer: 1,
            explanation: "As fibras ajudam na digestão e são encontradas em frutas, verduras e grãos integrais."
        },
        {
            question: "Qual bebida é a melhor para hidratação após exercícios?",
            options: ["Refrigerante", "Água", "Suco artificial"],
            answer: 1,
            explanation: "A água repõe os líquidos perdidos sem adicionar açúcares desnecessários."
        },
        {
            question: "Qual nutriente fornece energia rápida para o corpo?",
            options: ["Proteína", "Carboidrato", "Gordura"],
            answer: 1,
            explanation: "Carboidratos são a principal fonte de energia para atividades físicas e mentais."
        },
        {
            question: "Qual alimento é rico em ômega-3, bom para o cérebro?",
            options: ["Batata frita", "Salmão", "Chocolate"],
            answer: 1,
            explanation: "O ômega-3, presente em peixes como salmão, ajuda no desenvolvimento cerebral."
        },
        {
            question: "Qual fruta é conhecida por ser rica em potássio, importante para os músculos?",
            options: ["Morango", "Banana", "Uva"],
            answer: 1,
            explanation: "O potássio ajuda no funcionamento muscular e previne cãibras."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    const showQuestion = () => {
        const question = quiz[currentQuestion];
        document.getElementById('quizQuestion').textContent = question.question;
        document.getElementById('quizOptions').innerHTML = question.options.map((option, index) => `
            <button class="btn btn-sm btn-option mb-2" data-answer="${index}">
                ${option}
            </button>
        `).join('');
        
        // Adiciona listeners aos botões de opção
        document.querySelectorAll('.btn-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedAnswer = parseInt(e.target.dataset.answer);
                const isCorrect = selectedAnswer === question.answer;
                
                // Feedback visual
                e.target.classList.add(isCorrect ? 'bg-success' : 'bg-danger');
                e.target.innerHTML = `${option} <i class="bi ${isCorrect ? 'bi-check' : 'bi-x'}"></i>`;
                
                if (isCorrect) score++;
                
                // Desabilita outros botões
                document.querySelectorAll('.btn-option').forEach(b => {
                    b.disabled = true;
                    if (parseInt(b.dataset.answer) === question.answer) {
                        b.classList.add('bg-success');
                    }
                });
                
                // Mostra explicação
                const explanation = document.createElement('div');
                explanation.className = 'alert alert-info mt-3';
                explanation.textContent = question.explanation;
                document.getElementById('quizOptions').appendChild(explanation);
            });
        });
    };

    // Ranking (melhorado)
    const rankingData = [
        { name: "Chef Master", score: 1850, avatar: "bi-trophy-fill" },
        { name: "Nutri Expert", score: 1620, avatar: "bi-egg-fill" },
        { name: "Você", score: 900, avatar: "bi-person-fill" },
        { name: "Aprendiz", score: 750, avatar: "bi-emoji-smile" },
        { name: "Iniciante", score: 450, avatar: "bi-emoji-neutral" }
    ];

    const updateRanking = () => {
        document.getElementById('rankingList').innerHTML = rankingData.map((player, index) => `
            <li class="list-group-item d-flex justify-content-between align-items-center ${player.name === "Você" ? 'active' : ''}">
                <div class="d-flex align-items-center">
                    <span class="badge bg-${index === 0 ? 'warning' : 'secondary'} me-3">
                        ${index + 1}
                    </span>
                    <i class="bi ${player.avatar} me-2"></i>
                    <span>${player.name}</span>
                </div>
                <span class="badge bg-primary rounded-pill">${player.score} pts</span>
            </li>
        `).join('');
    };

    // Event Listeners (melhorado)
    document.getElementById('nextQuestion')?.addEventListener('click', () => {
        currentQuestion = (currentQuestion + 1) % quiz.length;
        showQuestion();
    });

     document.getElementById('loginBtn')?.addEventListener('click', () => {
        // Abre o modal de login
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    });

    // Inicialização (melhorada)
    const init = () => {
        setupPyramid(); // Adiciona a pirâmide alimentar
        updateProgress();
        loadRecipes();
        showQuestion();
        updateRanking();
        
        // Adiciona efeito de digitação ao título
        const title = document.querySelector('.glass h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            text.split('').forEach((char, i) => {
                setTimeout(() => {
                    title.textContent += char;
                }, i * 100);
            });
        }
    };

    init();
});