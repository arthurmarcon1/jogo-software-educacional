document.addEventListener('DOMContentLoaded', () => {
    // Sistema de Progresso
    const userProgress = {
        level: 1,
        completedRecipes: 3,
        achievements: ['Iniciante', '5 Receitas'],
        progress: 25
    };

    const updateProgress = () => {
        document.getElementById('mainProgress').style.width = `${userProgress.progress}%`;
        document.getElementById('mainProgress').textContent = `${userProgress.progress}%`;
        document.getElementById('achievements').innerHTML = userProgress.achievements.map(ach => `
            <span class="badge bg-primary me-2">
                <i class="bi bi-trophy"></i> ${ach}
            </span>
        `).join('');
    };

    // Carregar Receitas
    const loadRecipes = async () => {
        try {
            const response = await fetch('data/recipes.json');
            const recipes = await response.json();
            const carouselInner = document.getElementById('carouselItems');

            recipes.forEach((recipe, index) => {
                const item = document.createElement('div');
                item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                item.innerHTML = `
                    <img src="${recipe.image}" class="d-block w-75 mx-auto" alt="${recipe.name}">
                    <div class="carousel-caption">
                        <h5>${recipe.name}</h5>
                        <p>${recipe.description}</p>
                    </div>
                `;
                carouselInner.appendChild(item);
            });
        } catch (error) {
            console.error('Erro ao carregar receitas:', error);
        }
    };

    // Sistema de Quiz
    const quiz = [
        {
            question: "Qual é o melhor substituto para ovos em receitas veganas?",
            options: ["Banana", "Linhaça", "Ambos"],
            answer: 2
        },
        {
            question: "Qual farinha não contém glúten?",
            options: ["Trigo", "Aveia", "Arroz"],
            answer: 2
        }
    ];

    let currentQuestion = 0;
    const showQuestion = () => {
        const question = quiz[currentQuestion];
        document.getElementById('quizQuestion').textContent = question.question;
        document.getElementById('quizOptions').innerHTML = question.options.map((option, index) => `
            <button class="btn btn-sm btn-option mb-2" data-answer="${index}">
                ${option}
            </button>
        `).join('');
    };

    // Ranking
    const rankingData = [
        { name: "Jogador1", score: 1500 },
        { name: "Jogador2", score: 1200 },
        { name: "Você", score: 900 }
    ];

    const updateRanking = () => {
        document.getElementById('rankingList').innerHTML = rankingData.map(player => `
            <li class="list-group-item d-flex justify-content-between">
                <span>${player.name}</span>
                <span>${player.score} pts</span>
            </li>
        `).join('');
    };

    // Event Listeners
    document.getElementById('nextQuestion').addEventListener('click', () => {
        currentQuestion = (currentQuestion + 1) % quiz.length;
        showQuestion();
    });

    // Inicialização
    updateProgress();
    loadRecipes();
    showQuestion();
    updateRanking();
});