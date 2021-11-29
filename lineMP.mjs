export function lineMP ( pontoA, pontoB){
        let simetrico = false;                      //Variavel auxiliar para verificar se existiu trocas de valores
        let declive = false;                        //dos pontos devido a estarem noutro octante que não o padrão
        let dx = pontoB.x - pontoA.x;                           //DeltaX
        let dy = pontoB.y - pontoA.y;                           //DeltaY
        let m = dx * dy;                            //Declive da reta
        if(m < 0){                                  //Verifica se declive é negativo
            simetrico = true;                       //Se for negativo atualiza valor de simetrico
            dy = -dy;                               //e troca valores de deltay e y0 e y1
            pontoA.y = -pontoA.y;                               //para valores simétricos
            pontoB.y = -pontoB.y;
        }
        if(Math.abs(dx)< Math.abs(dy)){             //Verifica se o valor (absoluto) de deltaX é infeior ao de deltaY
            declive = true;                         //Se for atualiza o valor de declive
            let aux = pontoA.x;                           //e troca a ordem das coordenadas (x,y) para (y,x)
            pontoA.x= pontoA.y;                                //de ambos os pontos
            pontoA.y = aux;
            aux = pontoB.x;
            pontoB.x = pontoB.y;
            pontoB.y = aux;
            aux = dx;                               //e dos delta também
            dx = dy;
            dy = aux;
        }
        if(pontoA.x > pontoB.x){                               //verifica se valor de x0 é superior ao de x1
            let aux = pontoA.x;                                //Caso seja troca a ordem dos pontos
            pontoA.x = pontoB.x;
            pontoB.x = aux;
            aux = pontoA.y;
            pontoA.y = pontoB.y;
            pontoB.y = aux;
            dx = -dx;                                  //e troca os deltas para os valores simétricos deles
            dy = -dy;
        }
        let pontos = [];                            //Variável que guarda os pontos calculados
        let y = pontoA.y;
        let incrementoE = 2 * dy;                   //Incremento para E
        let incrementoNE = 2 * (dy -dx);            //Incremento para NE
        let d = 2 * dy - dx;                        //Valor de calculo base para os incrementos
        for (let x = pontoA.x; x < pontoB.x; x++){               //Calcula os pontos
            pontos.push({x:x,y:y});
            if(d <= 0){
                d += incrementoE;                   //Se d for negativo ou nulo incrementa d para E
            } else {
                y++;                                //Se d for positivo incrementa y
                d += incrementoNE;                  //e d incrementa para NE
            }
        }
        pontos.push([pontoB.x,pontoB.y]);          //Adiciona a ultima coordenada da extremidade da linha
        for(let i = 0; i < pontos.length; i++){    //Percorre o array de pontos Para atualizar os valores com base nas variáveis auxiliares
            let p = pontos[i];
            //let y = pontos[i][1];
            if(declive == true){                    //Verifica se existiu troca de coordenadas
                let aux = p.x;                        //Caso exista volta a trocar x com y (calculados)
                p.x = p.y;
                p.y = aux;
            }
            if(simetrico == true){                  //Verifica se existiu troca de valores para simétricos
                p.y = -p.y;                             //Caso exista volta a trocar y (calculado) para o seu simétrico
            }
            pontos[i]= {x:p.x,y:p.y};                       //Atualiza os valores no array de pontos
        }
        return pontos;
}