export function generateId() {
    let html = '';
    for (let i = 1; i < 8; i++) {
        html += 1 + Math.floor(Math.random() * 10);
    }
    return html;
}
