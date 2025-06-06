// main.js
import { renderEditor } from './editor.js';
import { renderBrowse } from './browse.js';
import { renderSettings } from './theme.js';
import { renderAbout } from './utils.js';

const app = document.getElementById('app');

function renderSidebar(active) {
    return `
    <nav class="sidebar">
        <button data-page="editor" class="${active === 'editor' ? 'active' : ''}" title="Редактор">&#9998;</button>
        <button data-page="browse" class="${active === 'browse' ? 'active' : ''}" title="Browse">&#128269;</button>
        <button data-page="settings" class="${active === 'settings' ? 'active' : ''}" title="Настройки">&#9881;</button>
        <button data-page="about" class="${active === 'about' ? 'active' : ''}" title="О проекте">&#8505;</button>
    </nav>
    `;
}

function route() {
    // Normalize the hash to avoid potential issues with multiple '#'
    let hash = location.hash.slice(1);
    let page = 'editor'; // default
    if (hash === 'browse') page = 'browse';
    if (hash === 'settings') page = 'settings';
    if (hash === 'about') page = 'about';
    if (hash && hash.length > 0 && !['browse','settings','about'].includes(hash)) {
        // будем считать, что это id сниппета (детально реализуем позже)
        page = 'editor'; // пока editor, потом отдельный режим
    }

    let mainContent = '';
    if (page === 'editor') mainContent = renderEditor();
    if (page === 'browse') mainContent = renderBrowse();
    if (page === 'settings') mainContent = renderSettings();
    if (page === 'about') mainContent = renderAbout();

    app.innerHTML = renderSidebar(page) + `<div class="main-content">${mainContent}</div>`;

    // Привязываем обработчики для бокового меню
    document.querySelectorAll('.sidebar button').forEach(btn => {
        btn.onclick = () => {
            location.hash = btn.dataset.page;
        };
    });
}

// Слушаем смену hash
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
