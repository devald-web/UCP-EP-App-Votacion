const fs = require('fs');
const path = require('path');

// Carpetas que queremos excluir (comunes en .NET y otros entornos)
const excludedDirs = new Set(['.vs', 'bin', 'obj', '.git', '.vscode', 'node_modules']);

function printTree(dirPath, indent = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        const prefix = isLast ? '└── ' : '├── ';
        const nextIndent = indent + (isLast ? '    ' : '│   ');

        if (excludedDirs.has(item.name)) return;

        console.log(indent + prefix + item.name);

        const fullPath = path.join(dirPath, item.name);
        if (item.isDirectory()) {
            printTree(fullPath, nextIndent);
        }
    });
}

// Cambia esta ruta a donde está tu proyecto
const rootDir = process.argv[2] || '.';

console.log(rootDir);
printTree(rootDir);
