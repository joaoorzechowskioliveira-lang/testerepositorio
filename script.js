// Base de Dados Estruturada para Componentes (Array de Objetos)
const mapaDados = {
    oeste: {
        titulo: "Cascavel e Região Oeste",
        cultura: "Soja, Milho e Avicultura",
        vbp: "R$ 22.4 Bilhões",
        logistica: "Acesso direto à Ferroeste e BR-277",
        descricao: "Polo tecnológico de alta produtividade global, referência nacional em cooperativismo de grande porte e integração de cadeias de proteína animal."
    },
    norte: {
        titulo: "Londrina e Região Norte",
        cultura: "Milho, Soja e Cafés Especiais",
        vbp: "R$ 14.8 Bilhões",
        logistica: "Entroncamento rodoferroviário estratégico para SP",
        descricao: "Berço histórico do desenvolvimento agrícola do estado, hoje focado fortemente em tecnologia de bioinsumos e agtechs digitais."
    },
    noroeste: {
        titulo: "Maringá e Região Noroeste",
        cultura: "Mandioca, Cana-de-açúcar e Grãos",
        vbp: "R$ 16.1 Bilhões",
        logistica: "Conexão direta com o Noroeste Paulista",
        descricao: "Diversificação agrícola de destaque com altíssimo grau de industrialização e agregação de valor local de produtos derivados."
    },
    camposgerais: {
        titulo: "Ponta Grossa (Campos Gerais)",
        cultura: "Trigo, Cevada e Soja",
        vbp: "R$ 19.5 Bilhões",
        logistica: "Fácil escoamento para o Porto de Paranaguá",
        descricao: "Liderança absoluta em produtividade de safras de inverno e parque agroindustrial altamente tecnificado de processamento de óleos."
    },
    centrosul: {
        titulo: "Guarapuava e Centro-Sul",
        cultura: "Cevada, Batata e Malte",
        vbp: "R$ 12.3 Bilhões",
        logistica: "Hub central de distribuição para o sul do país",
        descricao: "Maior polo produtor de cevada cervejeira da América Latina, impulsionado por investimentos contínuos de grandes cooperativas."
    }
};

const imagens = [
    {
        src: './img/campo.png',
        description: 'Campo de soja no Paraná.',
        alt: 'Campo de soja.'
     },
    { 
        src: './img/maquinario.png',
        description: 'Maquinário coletando grãos.',
        alt: 'Maquinário.'
    },
    { 
        src: './img/frutas.png',
        description: 'Caminhão carregado de tomates',
        alt: 'Caminhão carregando tomates'
     }
];

const faqs = [
    { pergunta: "Qual o foco atual do ecossistema agrícola do Paraná em 2026?", resposta: "A prioridade total está na sustentabilidade socioambiental de ponta, acoplada à biotecnologia avançada para atender aos novos ecossistemas regulatórios internacionais." },
    { pergunta: "Como funciona a logística de exportação do estado?", resposta: "O escoamento flui com sinergias integradas entre a malha ferroviária e o corredor rodoviário central direcionado ao Porto de Paranaguá, um dos portos mais eficientes em grãos do mundo." },
    { pergunta: "Onde obter os dados consolidados do VBP?", font: "Os dados oficiais são compilados e revisados periodicamente pelo DERAL (Departamento de Economia Rural) e disponibilizados de forma transparente." }
];

// Lógica de Controle do Mapa Interativo
const regions = document.querySelectorAll('.map-region');
const markers = document.querySelectorAll('.map-marker');
const placeholder = document.getElementById('panel-placeholder');
const content = document.getElementById('panel-content');

function atualizarPainel(idRegiao) {
    const dados = mapaDados[idRegiao];
    if (dados) {
        placeholder.classList.add('hidden');
        content.classList.remove('hidden');
        
        document.getElementById('info-title').innerText = dados.titulo;
        document.getElementById('info-culture').innerText = dados.cultura;
        document.getElementById('info-vbp').innerText = dados.vbp;
        document.getElementById('info-logistica').innerText = dados.logistica;
        document.getElementById('info-description').innerText = dados.descricao;
        
        // Sincronizar classes ativas visuais
        regions.forEach(r => r.classList.remove('active'));
        markers.forEach(m => m.classList.remove('active'));
        
        const regionEl = document.getElementById(`region-${idRegiao}`);
        const markerEl = document.querySelector(`[data-region="${idRegiao}"]`);
        if(regionEl) regionEl.classList.add('active');
        if(markerEl) markerEl.classList.add('active');
    }
}

markers.forEach(el => {
    el.addEventListener('click', () => {
        const id = el.getAttribute('data-region');
        atualizarPainel(id);
    });
});

// Renderização e Controle do Carrossel (Imagens)
const track = document.getElementById('carousel-track');
let carouselIndex = 0;

imagens.forEach(d => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
        <img src="${d.src}" alt="${d.alt}" class="carousel-img">
        <p class="carousel-caption">${d.description}</p>
    `;
    track.appendChild(item);
});

function moverCarrossel() {
    track.style.transform = `translateX(-${carouselIndex * 100}%)`;
}

document.getElementById('carousel-next').addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % imagens.length;
    moverCarrossel();
});

document.getElementById('carousel-prev').addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + imagens.length) % imagens.length;
    moverCarrossel();
});

// Renderização e Controle do Acordeão (FAQ)
const faqAccordion = document.getElementById('faq-accordion');

faqs.forEach((f, idx) => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `
        <button class="accordion-header" aria-expanded="false">
            <span>${f.pergunta}</span>
            <span class="accordion-icon">+</span>
        </button>
        <div class="accordion-content">
            <p>${f.resposta || f.font}</p>
        </div>
    `;
    faqAccordion.appendChild(item);
    
    item.querySelector('.accordion-header').addEventListener('click', function() {
        const active = item.classList.contains('active');
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-content').style.maxHeight = null;
            i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        });
        
        if (!active) {
            item.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
            const contentEl = item.querySelector('.accordion-content');
            contentEl.style.maxHeight = contentEl.scrollHeight + "px";
        }
    });
});

// Lógica de Acessibilidade (Contraste e Tamanho de Fonte)
let tamanhoFonteAtual = 16;
const htmlEl = document.documentElement;

document.getElementById('btn-font-increase').addEventListener('click', () => {
    if (tamanhoFonteAtual < 24) {
        tamanhoFonteAtual += 2;
        htmlEl.style.setProperty('--font-base', `${tamanhoFonteAtual}px`);
    }
});

document.getElementById('btn-font-decrease').addEventListener('click', () => {
    if (tamanhoFonteAtual > 12) {
        tamanhoFonteAtual -= 2;
        htmlEl.style.setProperty('--font-base', `${tamanhoFonteAtual}px`);
    }
});

document.getElementById('btn-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});