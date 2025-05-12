// Sistema de Login
document.addEventListener('DOMContentLoaded', function() {
    // Variável para controlar se deve recarregar
    let shouldReload = false;

    // Carrega o modal de login
    function loadLoginModal() {
        fetch('assets/js/modals/login-modal.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                setupLoginEvents();
                
                // Listener para quando o modal de login fecha
                document.getElementById('loginModal').addEventListener('hidden.bs.modal', function() {
                    if(shouldReload) {
                        window.location.reload();
                    }
                });
                
                // Listener para quando o modal de registro fecha
                document.getElementById('registerModal').addEventListener('hidden.bs.modal', function() {
                    if(shouldReload) {
                        window.location.reload();
                    }
                });

                // Adiciona listeners para os botões de fechar (X)
                document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
                    btn.addEventListener('click', function() {
                        shouldReload = true; // Marca para recarregar ao fechar
                    });
                });
            })
            .catch(error => {
                console.error('Erro ao carregar o modal de login:', error);
            });
    }

    // Configura os eventos de login
    function setupLoginEvents() {
        // Abre o modal de login
        document.getElementById('loginBtn').addEventListener('click', () => {
            shouldReload = false; // Reseta o flag ao abrir
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });

        // Alternar para cadastro (não deve recarregar)
        document.getElementById('showRegister')?.addEventListener('click', (e) => {
            e.preventDefault();
            shouldReload = false; // Impede recarregamento nesta transição
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
            
            loginModal.hide();
            registerModal.show();
        });

        // Alternar para login (não deve recarregar)
        document.getElementById('showLogin')?.addEventListener('click', (e) => {
            e.preventDefault();
            shouldReload = false; // Impede recarregamento nesta transição
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            
            registerModal.hide();
            loginModal.show();
        });

        // Login bem-sucedido
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if(email && password) {
                alert('Login realizado com sucesso!');
                shouldReload = true; // Marca para recarregar ao fechar
                bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });

        // Cadastro bem-sucedido
        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('registerPassword').value;
            const confirm = document.getElementById('registerConfirm').value;
            
            if(password !== confirm) {
                alert('As senhas não coincidem!');
                return;
            }
            
            alert('Conta criada com sucesso! Faça login para continuar.');
            shouldReload = true; // Marca para recarregar ao fechar
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            
            registerModal.hide();
            loginModal.show();
        });
    }

    // Inicializa o sistema de login
    loadLoginModal();
});