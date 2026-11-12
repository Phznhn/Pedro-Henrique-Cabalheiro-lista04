const selectUsuario = document.getElementById('usuario');
const listaPosts = document.getElementById('lista-posts');
const detalhesPostagem = document.getElementById('detalhes-postagem');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(usuarios => {
        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id;
            option.textContent = usuario.name;
            selectUsuario.appendChild(option);
        });
    });

selectUsuario.addEventListener('change', () => {
    const userId = selectUsuario.value;
    listaPosts.innerHTML = '';
    detalhesPostagem.innerHTML = '';

    if (!userId) return;

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const div = document.createElement('div');
                div.className = 'post-item';
                div.textContent = post.title;

                div.addEventListener('click', () => {
                    document.querySelectorAll('.post-item').forEach(item => {
                        item.classList.remove('selecionado');
                    });
                    div.classList.add('selecionado');
                    carregarDetalhes(post.id);
                });

                listaPosts.appendChild(div);
            });
        });
});

function carregarDetalhes(postId) {
    detalhesPostagem.innerHTML = '';

    Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json()),
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(res => res.json())
    ]).then(([post, comentarios]) => {
        const titulo = document.createElement('h3');
        titulo.textContent = post.title;

        const corpo = document.createElement('p');
        corpo.textContent = post.body;

        const tituloComentarios = document.createElement('h4');
        tituloComentarios.textContent = 'Comentários:';

        detalhesPostagem.appendChild(titulo);
        detalhesPostagem.appendChild(corpo);
        detalhesPostagem.appendChild(tituloComentarios);

        comentarios.forEach(comentario => {
            const p = document.createElement('p');
            p.className = 'comentario-item';
            p.innerHTML = `<strong>${comentario.name}:</strong> ${comentario.body}`;
            detalhesPostagem.appendChild(p);
        });
    });
}