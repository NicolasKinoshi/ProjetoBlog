document.addEventListener('DOMContentLoaded', () => {
    const addPostBtn = document.getElementById('addPostBtn');
    const postModal = document.getElementById('postModal');
    const closeModal = document.querySelector('.close');
    const savePostBtn = document.getElementById('savePostBtn');
    const postContent = document.getElementById('postContent');
    let columnCount = 1;
    let rowCount = 1;

    addPostBtn.addEventListener('click', () => {
        postContent.value = '';
        postModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        postModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === postModal) {
            postModal.style.display = 'none';
        }
    });

    savePostBtn.addEventListener('click', () => {
        const content = postContent.value.trim();
        if (content) {
            addNewPost(content);
            postModal.style.display = 'none';
        }
    });

    function addNewPost(content) {
        if (columnCount <= 3 && rowCount <= 5) {
            let coluna = document.getElementById(`coluna${columnCount}`);
            if (!coluna) {
                coluna = createColumn();
                const container = document.querySelector('.container');
                container.appendChild(coluna);
            }

            const post = createPost(content);
            coluna.appendChild(post);

            if (columnCount === 3) {
                columnCount = 1;
                rowCount++;
            } else {
                columnCount++;
            }
        } else {
            alert('Limite máximo de postagens atingido (15 postagens).');
        }
    }

    function createColumn() {
        const column = document.createElement('div');
        column.className = 'column';
        column.id = `coluna${columnCount}`;
        column.innerHTML = `
            <h2>👤</h2>
        `;
        return column;
    }

    function createPost(content) {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <p>${content}</p>
            <div class="post-buttons">
                <button class="editBtn">Editar</button>
                <button class="deleteBtn">Excluir</button>
                <button class="commentBtn">Comentar</button>
            </div>
            <div class="comments-container"></div>
        `;
        post.querySelector('.editBtn').addEventListener('click', () => {
            currentEditPost = post;
            postContent.value = post.querySelector('p').innerText;
            postModal.style.display = 'block';
        });

        post.querySelector('.deleteBtn').addEventListener('click', () => {
            post.remove();
        });

        post.querySelector('.commentBtn').addEventListener('click', () => {
            openCommentModal(post);
        });

        return post;
    }


    const commentModal = document.getElementById('commentModal');
    const closeCommentModal = document.querySelector('.close-comment');
    const saveCommentBtn = document.getElementById('saveCommentBtn');
    const commentContent = document.getElementById('commentContent');
    const commentAuthor = document.getElementById('commentAuthor');
    let currentPostForComment = null;

    closeCommentModal.addEventListener('click', () => {
        commentModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === commentModal) {
            commentModal.style.display = 'none';
        }
    });

    saveCommentBtn.addEventListener('click', () => {
        const content = commentContent.value.trim();
        const author = commentAuthor.value.trim();
        if (content && author && currentPostForComment) {
            addNewComment(content, author, currentPostForComment);
            commentModal.style.display = 'none';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    function openCommentModal(post) {
        currentPostForComment = post;
        commentContent.value = '';
        commentModal.style.display = 'block';
    }

    function addNewComment(content, author, post) {
        const commentsContainer = post.querySelector('.comments-container');

        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `
            <p>${content}</p>
            <div class="comment-author">${author}</div>
            <div class="comment-date">${getCurrentTime()}</div>
        `;

        commentsContainer.appendChild(comment);
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
});
