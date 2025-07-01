// Sistema de Login Completo com HTML embutido
function initializeLoginSystem() {
    // Insere os modais no DOM
    document.body.insertAdjacentHTML('beforeend', `
        <!-- Modal de Login -->
        <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content glass-modal">
                    <div class="modal-header border-0">
                        <h5 class="modal-title"><i class="bi bi-person-circle"></i> Acesse sua conta</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm">
                            <div class="mb-3">
                                <label for="loginEmail" class="form-label">Email</label>
                                <input type="email" class="form-control glass-input" id="loginEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">Senha</label>
                                <input type="password" class="form-control glass-input" id="loginPassword" required>
                            </div>
                            <div class="d-flex justify-content-between mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="rememberLogin">
                                    <label class="form-check-label" for="rememberLogin">Lembrar-me</label>
                                </div>
                                <a href="#" class="text-white" id="forgotPassword">Esqueceu a senha?</a>
                            </div>
                            <button type="submit" class="btn btn-play w-100">Entrar</button>
                        </form>
                        
                        <div class="text-center mt-3">
                            <p class="mb-2">Ou entre com:</p>
                            <div class="d-flex justify-content-center gap-3">
                                <button class="btn btn-sm btn-social"><i class="bi bi-google"></i></button>
                                <button class="btn btn-sm btn-social"><i class="bi bi-facebook"></i></button>
                                <button class="btn btn-sm btn-social"><i class="bi bi-apple"></i></button>
                            </div>
                        </div>
                        
                        <div class="text-center mt-4">
                            <p>Não tem uma conta? <a href="#" class="text-white" id="showRegister">Criar conta</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal de Cadastro -->
        <div class="modal fade" id="registerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content glass-modal">
                    <div class="modal-header border-0">
                        <h5 class="modal-title"><i class="bi bi-person-plus"></i> Criar conta</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="registerForm">
                            <div class="mb-3">
                                <label for="registerName" class="form-label">Nome completo</label>
                                <input type="text" class="form-control glass-input" id="registerName" required>
                            </div>
                            <div class="mb-3">
                                <label for="registerEmail" class="form-label">Email</label>
                                <input type="email" class="form-control glass-input" id="registerEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="registerPassword" class="form-label">Senha</label>
                                <input type="password" class="form-control glass-input" id="registerPassword" required>
                            </div>
                            <div class="mb-3">
                                <label for="registerConfirm" class="form-label">Confirmar senha</label>
                                <input type="password" class="form-control glass-input" id="registerConfirm" required>
                            </div>
                            <button type="submit" class="btn btn-play w-100">Cadastrar</button>
                        </form>
                        
                        <div class="text-center mt-3">
                            <p>Já tem uma conta? <a href="#" class="text-white" id="showLogin">Fazer login</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            /* Modais de login */
            .glass-modal {
                background: rgba(0, 0, 0, 0.7) !important;
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                border-radius: 16px !important;
            }
        
            .glass-input {
                background: rgba(255, 255, 255, 0.1) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                color: white !important;
            }
        
            .glass-input:focus {
                background: rgba(255, 255, 255, 0.15) !important;
                box-shadow: 0 0 0 0.25rem rgba(136, 212, 152, 0.25) !important;
            }
        
            .btn-social {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
            }
        
            .btn-social:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        
            .modal-backdrop {
                backdrop-filter: blur(5px);
                background-color: rgba(0, 0, 0, 0.3) !important;
            }
        </style>
    `);

    // Variáveis para controle dos modais
    let loginModalInstance = null;
    let registerModalInstance = null;
    let isSwitchingModals = false; // Nova flag para controlar quando estamos alternando entre modais

    // Inicializa os modais
    function initializeModals() {
        const loginModalElement = document.getElementById('loginModal');
        if (loginModalElement) {
            loginModalInstance = new bootstrap.Modal(loginModalElement);
            
            loginModalElement.addEventListener('hidden.bs.modal', function() {
                // Só recarrega se não estivermos alternando entre modais
                if (!isSwitchingModals) {
                    window.location.reload();
                }
                // Reseta a flag após o fechamento
                isSwitchingModals = false;
            });
        }

        const registerModalElement = document.getElementById('registerModal');
        if (registerModalElement) {
            registerModalInstance = new bootstrap.Modal(registerModalElement);
            
            registerModalElement.addEventListener('hidden.bs.modal', function() {
                // Só recarrega se não estivermos alternando entre modais
                if (!isSwitchingModals) {
                    window.location.reload();
                }
                // Reseta a flag após o fechamento
                isSwitchingModals = false;
            });
        }
    }

    // Configura todos os eventos de login/registro
    function setupLoginEvents() {
        // Botão de login na navbar (código anterior permanece igual)
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                isSwitchingModals = false; // Não é alternância entre modais
                if (loginModalInstance) {
                    loginModalInstance.show();
                }
            });
        }

        // Alternar para cadastro - ATUALIZADO
        const showRegisterBtn = document.getElementById('showRegister');
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                isSwitchingModals = true; // Estamos alternando entre modais
                if (loginModalInstance && registerModalInstance) {
                    loginModalInstance.hide();
                    registerModalInstance.show();
                }
            });
        }

        // Alternar para login - ATUALIZADO
        const showLoginBtn = document.getElementById('showLogin');
        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                isSwitchingModals = true; // Estamos alternando entre modais
                if (registerModalInstance && loginModalInstance) {
                    registerModalInstance.hide();
                    loginModalInstance.show();
                }
            });
        }

        // Formulário de login - ATUALIZADO
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail')?.value;
                const password = document.getElementById('loginPassword')?.value;
                
                if (email && password) {
                    // Login bem-sucedido
                    isSwitchingModals = false; // Não é alternância, é submit
                    if (loginModalInstance) {
                        loginModalInstance.hide();
                    }
                    window.location.reload();
                } else {
                    alert('Por favor, preencha todos os campos.');
                }
            });
        }

        // Formulário de registro - ATUALIZADO
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const password = document.getElementById('registerPassword')?.value;
                const confirmPassword = document.getElementById('registerConfirm')?.value;
                
                if (password !== confirmPassword) {
                    alert('As senhas não coincidem!');
                    return;
                }
                
                // Registro bem-sucedido
                isSwitchingModals = false; // Não é alternância, é submit
                if (registerModalInstance) {
                    registerModalInstance.hide();
                }
                window.location.reload();
            });
        }
    }

    // Inicializa tudo
    initializeModals();
    setupLoginEvents();
}

// Inicia o sistema quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeLoginSystem);