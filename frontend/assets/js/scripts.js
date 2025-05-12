document.addEventListener('DOMContentLoaded', () => {

    // Regras do Jogo
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
        try {
            // Tenta carregar do arquivo JSON
            const response = await fetch('data/recipes.json');
            if (!response.ok) throw new Error('Falha ao carregar receitas');
            const recipes = await response.json();
            
            const carouselInner = document.getElementById('carouselItems');
            carouselInner.innerHTML = ''; // Limpa qualquer conteúdo existente
            
            recipes.forEach((recipe, index) => {
                const item = document.createElement('div');
                item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                item.innerHTML = `
                    <img src="${recipe.image}" class="d-block w-75 mx-auto" alt="${recipe.name}" loading="lazy">
                    <div class="carousel-caption">
                        <h5>${recipe.name}</h5>
                        <p>${recipe.description}</p>
                        <small class="d-block mt-2">
                            <i class="bi bi-clock"></i> ${recipe.time} min | 
                            <i class="bi bi-people"></i> ${recipe.servings} porções
                        </small>
                    </div>
                `;
                carouselInner.appendChild(item);
            });
            
            // Adiciona indicadores se houver mais de 1 receita
            if (recipes.length > 1) {
                const indicators = document.createElement('div');
                indicators.className = 'carousel-indicators';
                recipes.forEach((_, i) => {
                    const indicator = document.createElement('button');
                    indicator.type = 'button';
                    indicator.dataset.bsTarget = '#recipeCarousel';
                    indicator.dataset.bsSlideTo = i;
                    if (i === 0) indicator.className = 'active';
                    indicators.appendChild(indicator);
                });
                document.getElementById('recipeCarousel').prepend(indicators);
            }
        } catch (error) {
            console.error('Erro ao carregar receitas:', error);
            // Fallback caso o JSON não carregue
            const carouselInner = document.getElementById('carouselItems');
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <img src="https://via.placeholder.com/800x400?text=Receitas+Saudáveis" class="d-block w-75 mx-auto" alt="Fallback">
                    <div class="carousel-caption">
                        <h5>Receitas Deliciosas</h5>
                        <p>Experimente nossas receitas saudáveis!</p>
                    </div>
                </div>
            `;
        }
    };

    // Sistema de Quiz (melhorado)
    const quiz = [
        {
            question: "Qual é o melhor substituto para ovos em receitas veganas?",
            options: ["Banana", "Linhaça", "Ambos"],
            answer: 2,
            explanation: "Tanto a banana quanto a linhaça (misturada com água) podem substituir ovos em receitas veganas, dependendo do resultado desejado."
        },
        {
            question: "Qual farinha não contém glúten?",
            options: ["Trigo", "Aveia", "Arroz"],
            answer: 2,
            explanation: "A farinha de arroz é naturalmente sem glúten, enquanto a farinha de trigo contém glúten e a aveia pode conter traços dependendo do processamento."
        },
        {
            question: "Qual destes ingredientes é rico em ômega-3?",
            options: ["Linhaça", "Açúcar", "Farinha branca"],
            answer: 0,
            explanation: "A linhaça é uma excelente fonte vegetal de ômega-3, um ácido graxo essencial para a saúde cardiovascular."
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

    // Login button
    document.getElementById('loginBtn')?.addEventListener('click', () => {
        // Abre o modal de login
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    });
    
    // Inicialização (melhorada)
    const init = () => {
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