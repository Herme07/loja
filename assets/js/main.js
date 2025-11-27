// ========================================
// SISTEMA DE CARRINHO - IMPORTARIO
// ========================================

// Configurações
const CONFIG = {
    emailDestino: 'importario@gmail.com',
    telefoneDestino: '+244930060830', // Número da Importario para receber SMS
    moeda: 'Kz',
    storageKey: 'carrinho'
};

// ========================================
// MENU MOBILE
// ========================================
const btnmenu = document.getElementById('btnmenu');
const menu = document.getElementById('menu');

if (btnmenu && menu) {
    btnmenu.addEventListener('click', () => {
        menu.classList.toggle('active'); // Fix: era 'taggle'
    });
}

// ========================================
// BASE DE DADOS DE PRODUTOS
// ========================================
const productsDB = [
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        category: "telefone",
        origin: "eua",
        price: "480.000",
        description: "Tela AMOLED 6.8\" e câmera de 200MP"
    },
    {
        id: 3,
        name: "MacBook Pro M3",
        category: "pc",
        origin: "eua",
        price: "1050.000",
        description: "16GB RAM, 512GB SSD, chip M3"
    },
    {
        id: 4,
        name: "Dell XPS 15",
        category: "pc",
        origin: "eua",
        price: "850.000",
        description: "Intel i7, 16GB RAM, RTX 4050"
    },
    {
        id: 6,
        name: "Lenovo Legion 5",
        category: "pc",
        origin: "china",
        price: "550.000",
        description: "Gaming laptop, RTX 4060, 16GB RAM"
    },
    {
        id: 8,
        name: "Huawei MateBook D15",
        category: "pc",
        origin: "china",
        price: "380.000",
        description: "Intel i5, 8GB RAM, 512GB SSD"
    },
    { id: 9, name: "iPhone 6 64GB", category: "telefone", origin: "eua", price: "55.000", description: "iPhone 6 normal 64GB" },
    { id: 10, name: "iPhone 6s 64GB", category: "telefone", origin: "eua", price: "65.000", description: "iPhone 6s com 64GB de armazenamento" },
    { id: 11, name: "iPhone 7 64GB", category: "telefone", origin: "eua", price: "70.000", description: "iPhone 7 normal 64GB" },
    { id: 12, name: "iPhone 7 Plus 128GB", category: "telefone", origin: "eua", price: "110.000", description: "iPhone 7 Plus 128GB" },
    { id: 13, name: "iPhone 8 64GB", category: "telefone", origin: "eua", price: "110.000", description: "iPhone 8 64GB" },
    { id: 14, name: "iPhone 8 Plus 64GB", category: "telefone", origin: "eua", price: "130.000", description: "iPhone 8 Plus 64GB" },
    { id: 15, name: "iPhone 8 Plus 256GB", category: "telefone", origin: "eua", price: "150.000", description: "iPhone 8 Plus 256GB" },
    { id: 16, name: "iPhone XR 64GB", category: "telefone", origin: "eua", price: "200.000", description: "iPhone XR 64GB" },
    { id: 17, name: "iPhone XR 128GB", category: "telefone", origin: "eua", price: "210.000", description: "iPhone XR 128GB" },
    { id: 18, name: "iPhone Xs 64GB", category: "telefone", origin: "eua", price: "190.000", description: "iPhone Xs 64GB" },
    { id: 19, name: "iPhone X 64GB", category: "telefone", origin: "eua", price: "165.000", description: "iPhone X normal 64GB" },
    { id: 20, name: "iPhone Xs Max 128GB", category: "telefone", origin: "eua", price: "215.000", description: "iPhone Xs Max 128GB" },
    { id: 21, name: "iPhone 11 64GB", category: "telefone", origin: "eua", price: "255.000", description: "iPhone 11 64GB" },
    { id: 22, name: "iPhone 11 128GB", category: "telefone", origin: "eua", price: "285.000", description: "iPhone 11 128GB" },
    { id: 23, name: "iPhone 11 Pro 128GB", category: "telefone", origin: "eua", price: "310.000", description: "iPhone 11 Pro 128GB" },
    { id: 24, name: "iPhone 12 128GB", category: "telefone", origin: "eua", price: "350.000", description: "iPhone 12 128GB" },
    { id: 25, name: "iPhone 12 Pro 128GB", category: "telefone", origin: "eua", price: "440.000", description: "iPhone 12 Pro 128GB" },
    { id: 26, name: "iPhone 12 Pro Max 128GB", category: "telefone", origin: "eua", price: "510.000", description: "iPhone 12 Pro Max 128GB" },
    { id: 27, name: "iPhone 13 128GB", category: "telefone", origin: "eua", price: "440.000", description: "iPhone 13 128GB" },
    { id: 28, name: "iPhone 13 Pro Max 128GB", category: "telefone", origin: "eua", price: "550.000", description: "iPhone 13 Pro Max 128GB" },
    { id: 29, name: "iPhone 14 Pro Max 560GB", category: "telefone", origin: "eua", price: "800.000", description: "iPhone 14 Pro Max 560GB" }
];

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

// Formata número para moeda
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-AO').format(valor) + ' ' + CONFIG.moeda;
}

// Converte string de preço para número
function parsePreco(precoString) {
    return Number(precoString.replace(/\./g, '').replace(',', '.'));
}

// Obtém carrinho do localStorage
function obterCarrinho() {
    try {
        return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || [];
    } catch (error) {
        console.error('Erro ao obter carrinho:', error);
        return [];
    }
}

// Salva carrinho no localStorage
function salvarCarrinho(carrinho) {
    try {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(carrinho));
        atualizarContadorCarrinho();
    } catch (error) {
        console.error('Erro ao salvar carrinho:', error);
        mostrarAlerta('Erro ao salvar no carrinho', 'erro');
    }
}

// Atualiza contador do carrinho
function atualizarContadorCarrinho() {
    const carrinho = obterCarrinho();
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    
    const btnCarrinho = document.querySelector('.btn-ir-carrinho');
    if (btnCarrinho) {
        btnCarrinho.textContent = `Ver carrinho (${totalItens})`;
        btnCarrinho.href = 'carrinho.html';
    }
}

// ========================================
// SISTEMA DE ALERTAS PROFISSIONAL
// ========================================

function mostrarAlerta(mensagem, tipo = 'sucesso') {
    // Remove alertas anteriores
    const alertaAntigo = document.querySelector('.alerta-custom');
    if (alertaAntigo) alertaAntigo.remove();

    // Cria o alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta-custom alerta-${tipo}`;
    
    const icone = tipo === 'sucesso' ? '✓' : tipo === 'erro' ? '✕' : 'ℹ';
    
    alerta.innerHTML = `
        <div class="alerta-conteudo">
            <span class="alerta-icone">${icone}</span>
            <span class="alerta-mensagem">${mensagem}</span>
        </div>
    `;

    // Adiciona estilos inline
    Object.assign(alerta.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: tipo === 'sucesso' ? '#10b981' : tipo === 'erro' ? '#ef4444' : '#3b82f6',
        color: 'white',
        padding: '20px 30px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        zIndex: '10000',
        minWidth: '300px',
        maxWidth: '500px',
        animation: 'slideIn 0.3s ease-out',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: '500'
    });

    // Adiciona ao body
    document.body.appendChild(alerta);

    // Remove após 3 segundos
    setTimeout(() => {
        alerta.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => alerta.remove(), 300);
    }, 3000);
}

// Adiciona estilos de animação
if (!document.getElementById('alerta-styles')) {
    const style = document.createElement('style');
    style.id = 'alerta-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -40%);
            }
        }

        .alerta-conteudo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }

        .alerta-icone {
            font-size: 24px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// RENDERIZAÇÃO DE PRODUTOS
// ========================================

let currentFilter = 'todos';

function renderProducts(filter = 'todos') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    let filteredProducts = filter === 'todos' 
        ? productsDB 
        : productsDB.filter(p => p.category === filter || p.origin === filter);

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Nenhum produto encontrado.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="product-category">${product.category === 'telefone' ? 'Telefone' : 'PC'}</span>
            <h3>${product.name}</h3>
            <p class="product-origin">Origem: ${product.origin.toUpperCase()}</p>
            <p>${product.description}</p>
            <p class="product-price">${product.price} ${CONFIG.moeda}</p>
            <button class="btnsub carrinhobtn" onclick="addToCart(${product.id})">
                <i class="fa fa-shopping-cart"></i> Importar
            </button>
        `;
        grid.appendChild(card);
    });
}

function filterProducts(filter) {
    currentFilter = filter;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderProducts(filter);
}

function scrollToProducts() {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
}

// Inicializa produtos se estiver na página inicial
if (document.getElementById('productsGrid')) {
    renderProducts();
    atualizarContadorCarrinho();
}

// ========================================
// ADICIONAR AO CARRINHO
// ========================================

function addToCart(productId) {
    const product = productsDB.find(p => p.id === productId);
    
    if (!product) {
        mostrarAlerta('Produto não encontrado!', 'erro');
        return;
    }

    let carrinho = obterCarrinho();
    let item = carrinho.find(i => i.id === productId);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            id: product.id,
            nome: product.name,
            preco: parsePreco(product.price),
            imagem: `imagens/produtos/${product.id}.jpg`,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);
    mostrarAlerta(`${product.name} adicionado ao carrinho!`, 'sucesso');
}

// ========================================
// PÁGINA DO CARRINHO (carrinho.html)
// ========================================

function renderizarCarrinho() {
    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCart = document.getElementById('emptyCart');
    const cartTable = document.getElementById('cartTable');

    if (!cartBody) return; // Não está na página do carrinho

    const carrinho = obterCarrinho();

    if (carrinho.length === 0) {
        cartTable.style.display = 'none';
        emptyCart.style.display = 'block';
        cartTotal.textContent = '0 ' + CONFIG.moeda;
        return;
    }

    cartTable.style.display = 'table';
    emptyCart.style.display = 'none';
    cartBody.innerHTML = '';

    let totalGeral = 0;

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${formatarMoeda(item.preco)}</td>
            <td>
                <button onclick="alterarQuantidade(${index}, -1)" style="padding: 5px 10px; margin: 0 5px;">-</button>
                ${item.quantidade}
                <button onclick="alterarQuantidade(${index}, 1)" style="padding: 5px 10px; margin: 0 5px;">+</button>
            </td>
            <td>${formatarMoeda(subtotal)}</td>
            <td><button class="btn-remove" onclick="removerItem(${index})"><i class="fa fa-trash-alt"></i></button></td>
        `;
        cartBody.appendChild(tr);
    });

    cartTotal.textContent = formatarMoeda(totalGeral);
}

function alterarQuantidade(index, delta) {
    let carrinho = obterCarrinho();
    
    if (carrinho[index]) {
        carrinho[index].quantidade += delta;
        
        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        }
        
        salvarCarrinho(carrinho);
        renderizarCarrinho();
    }
}

function removerItem(index) {
    let carrinho = obterCarrinho();
    const nomeItem = carrinho[index]?.nome;
    
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    renderizarCarrinho();
    
    mostrarAlerta(`${nomeItem} removido do carrinho`, 'info');
}

// ========================================
// FINALIZAR COMPRA COM FORMSUBMIT
// ========================================

function finalizarCompra() {
    const carrinho = obterCarrinho();

    if (carrinho.length === 0) {
        mostrarAlerta('Seu carrinho está vazio!', 'erro');
        return;
    }

    // Cria modal de finalização
    criarModalFinalizacao();
}

function criarModalFinalizacao() {
    // Remove modal anterior se existir
    const modalAntigo = document.getElementById('modal-finalizacao');
    if (modalAntigo) modalAntigo.remove();

    const carrinho = obterCarrinho();
    const totalGeral = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

    // Lista de produtos para o email (formato detalhado)
    let listaProdutosEmail = carrinho.map(item => 
        `${item.nome} - Qtd: ${item.quantidade} - ${formatarMoeda(item.preco * item.quantidade)}`
    ).join('\n');

    // Lista de produtos para SMS (formato compacto)
    let listaProdutosSMS = carrinho.map(item => 
        `${item.nome} (${item.quantidade}x)`
    ).join(', ');

    // Resumo compacto para SMS
    const resumoPedido = `Novo Pedido Importario! ${carrinho.length} item(s). Total: ${formatarMoeda(totalGeral)}. Produtos: ${listaProdutosSMS}`;

    const modal = document.createElement('div');
    modal.id = 'modal-finalizacao';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-fechar" onclick="fecharModal()">&times;</button>
                <h2>🎉 Finalizar Pedido</h2>
                <p style="margin-bottom: 20px; color: #666;">Preencha seus dados para concluir a compra</p>
                
                <form action="https://formsubmit.co/${CONFIG.emailDestino}" method="POST" id="form-pedido">
                    <!-- Configurações do FormSubmit -->
                    <input type="hidden" name="_subject" value="🛒 Novo Pedido - Importario">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_template" value="table">
                    <input type="hidden" name="_autoresponse" value="Obrigado pelo seu pedido! Entraremos em contato em breve.">
                    
                    <!-- Enviar SMS para o número da Importario -->
                    <input type="hidden" name="_cc" value="${CONFIG.telefoneDestino}">
                    <input type="hidden" name="_replyto">
                    
                    <!-- Dados do Pedido -->
                    <input type="hidden" name="Produtos_Detalhados" value="${listaProdutosEmail}">
                    <input type="hidden" name="Total_Geral" value="${formatarMoeda(totalGeral)}">
                    <input type="hidden" name="Quantidade_Itens" value="${carrinho.length}">
                    <input type="hidden" name="Resumo_SMS" value="${resumoPedido.substring(0, 160)}">
                    
                    <!-- Campos do Cliente -->
                    <input type="text" name="Nome_Cliente" placeholder="Seu Nome Completo *" required>
                    <input type="tel" name="Telefone_Cliente" placeholder="Seu Telefone (ex: +244 930 060 830) *" required>
                    <input type="email" name="Email_Cliente" placeholder="Seu E-mail (opcional)">
                    <textarea name="Observacoes" placeholder="Endereço de entrega e observações adicionais" rows="4"></textarea>
                    
                    <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6;">
                        <p style="margin: 0; font-size: 14px; color: #1e40af;">
                            📱 <strong>Você receberá uma confirmação por email e SMS</strong><br>
                            📦 Total: ${formatarMoeda(totalGeral)} | ${carrinho.length} item(s)
                        </p>
                    </div>
                    
                    <button type="submit" class="btn-confirmar">✓ Confirmar Pedido</button>
                </form>
            </div>
        </div>
    `;

    // Estilos do modal
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s;
        }

        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideUp 0.3s;
        }

        .modal-fechar {
            position: absolute;
            top: 15px; right: 15px;
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: #999;
        }

        .modal-fechar:hover {
            color: #000;
        }

        .modal-content h2 {
            margin-bottom: 10px;
            color: #000;
        }

        .modal-content input,
        .modal-content textarea {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 15px;
            font-family: inherit;
        }

        .modal-content input:focus,
        .modal-content textarea:focus {
            outline: none;
            border-color: #000;
        }

        .btn-confirmar {
            width: 100%;
            padding: 15px;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 15px;
        }

        .btn-confirmar:hover {
            background: #059669;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Manipula o envio do formulário
    const form = modal.querySelector('#form-pedido');
    form.addEventListener('submit', function(e) {
        // Adiciona o email do cliente no _replyto para resposta automática
        const emailCliente = form.querySelector('input[name="Email_Cliente"]').value;
        const telefoneCliente = form.querySelector('input[name="Telefone_Cliente"]').value;
        
        if (emailCliente) {
            form.querySelector('input[name="_replyto"]').value = emailCliente;
        }

        // Mostra mensagem de envio
        mostrarAlerta('Enviando pedido... ⏳', 'info');

        // Limpa carrinho após pequeno delay (permite o envio do formulário)
        setTimeout(() => {
            localStorage.removeItem(CONFIG.storageKey);
        }, 1000);
    });
}

function fecharModal() {
    const modal = document.getElementById('modal-finalizacao');
    if (modal) modal.remove();
}

// ========================================
// INICIALIZAÇÃO DA PÁGINA DO CARRINHO
// ========================================

if (document.getElementById('cartBody')) {
    renderizarCarrinho();
}

// ========================================
// ANO ATUAL NO FOOTER
// ========================================

const anoAtual = document.getElementById('anoatual');
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

