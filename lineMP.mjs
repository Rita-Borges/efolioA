export function lineMP(pontoA, pontoB) {
    let trocarCoordenadas = false;
    let inverterValores = false;

    let dx = pontoB.x - pontoA.x;
    let dy = pontoB.y - pontoA.y;

    // Verificar e ajustar simetria
    if (dx * dy < 0) {
        inverterValores = true;
        dy = -dy;
        pontoA.y = -pontoA.y;
        pontoB.y = -pontoB.y;
    }

    // Verificar e ajustar declive
    if (Math.abs(dx) < Math.abs(dy)) {
        trocarCoordenadas = true;
        [pontoA.x, pontoA.y, pontoB.x, pontoB.y, dx, dy] = [pontoA.y, pontoA.x, pontoB.y, pontoB.x, dy, dx];
    }

    // Garantir que pontoA é à esquerda de pontoB
    if (pontoA.x > pontoB.x) {
        [pontoA.x, pontoB.x, pontoA.y, pontoB.y, dx, dy] = [pontoB.x, pontoA.x, pontoB.y, pontoA.y, -dx, -dy];
    }

    let pontos = [];
    let y = pontoA.y;
    let incrementoNE = 2 * (dy - dx);
    let d = 2 * dy - dx;

    for (let x = pontoA.x; x <= pontoB.x; x++) {
        pontos.push({ x: x, y: y });

        if (d <= 0) {
            d += 2 * dy; // Incremento de E
        } else {
            y++;
            d += incrementoNE; // Incremento de NE
        }
    }

    // Ajustar valores finais
    pontos = pontos.map(p => {
        if (trocarCoordenadas) {
            [p.x, p.y] = [p.y, p.x];
        }
        if (inverterValores) {
            p.y = -p.y;
        }
        return { x: p.x, y: p.y };
    });

    return pontos;
}
