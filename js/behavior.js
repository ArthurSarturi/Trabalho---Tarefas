const urlBase = "http://192.168.1.102:5000/";

async function atualizar() {
    const lista = document.getElementById("Lista");

    if (lista)
        lista.innerHTML = "Carregando...";

    const response = await fetch(urlBase);
    const dados = await response.json();

    if (!lista) return;

    lista.innerHTML = "";

    if (!Array.isArray(dados) || dados.length === 0) {
        lista.innerHTML = `<p class="vazio">Nenhuma tarefa cadastrada</p>`;
        return;
    }

    dados.forEach(tarefa => {
        const div = document.createElement("div");

        div.className = "tarefa";
        if (tarefa.prioridade === "Urgente")
            div.classList.add("urgente");

        div.innerHTML = `
            <p><b>Prioridade:</b> ${tarefa.prioridade}</p>
            <p><b>Descrição:</b> ${tarefa.descricao}</p>
            <p><b>Local:</b> ${tarefa.local}</p>
            <p><b>Recursos:</b> ${tarefa.recursosNecessarios.join(", ")}</p>
            <p><b>Data Limite:</b> ${tarefa.dataLimite}</p>
            <p><b>Matrícula:</b> ${tarefa.matricula}</p>
        `;

        lista.appendChild(div);
    });
}

async function salvar() {
    const dados = {
        prioridade: document.getElementById("prioridade").value,
        descricao: document.getElementById("descricao").value,
        local: document.getElementById("local").value,
        recursosNecessarios: document.getElementById("recursosNecessarios").value.split(",").map(r => r.trim()),
        dataLimite: document.getElementById("dataLimite").value,
        matricula: parseInt(document.getElementById("matricula").value)
    };

    if (!dados.prioridade || !dados.descricao || !dados.local || !dados.dataLimite || !dados.matricula) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const prioridadesValidas = ["Baixa", "Normal", "Urgente"];
    if (!prioridadesValidas.includes(dados.prioridade)) {
        alert("Prioridade inválida.");
        return;
    }

    await fetch(urlBase + "add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    window.location.href = "lista.html";
}
