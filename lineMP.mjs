export function lineMP ( pontoA, pontoB){
        let x0 = pontoA[0];
        let y0 = pontoA[1];
        let x1 = pontoB[0];
        let y1 = pontoB[1];
        let simetrico = false;                      //Variavel auxiliar para verificar se existiu trocas de valores
        let declive = false;                        //dos pontos devido a estarem noutro octante que não o padrão
        let dx = x0 - x0;                           //DeltaX
        let dy = y0 - y0;                           //DeltaY
        let m = dx * dy;                            //Declive da reta
        if(m < 0){                                  //Verifica se declive é negativo
            simetrico = true;                       //Se for negativo atualiza valor de simetrico
            dy = -dy;                               //e troca valores de deltay e y0 e y1
            y0 = -y0;                               //para valores simétricos
            y1 = -y1;
        }
        if(Math.abs(dx)< Math.abs(dy)){             //Verifica se o valor (absoluto) de deltaX é infeior ao de deltaY
            declive = true;                         //Se for atualiza o valor de declive
            let aux = x0;                           //e troca a ordem das coordenadas (x,y) para (y,x)
            x0= y0;                                //de ambos os pontos
            y0 = aux;
            aux = x1;
            x1 = y1;
            y1 = aux;
            aux = dx;                               //e dos delta também
            dx = dy;
            dy = aux;
        }
        if(x0 > x1){                               //verifica se valor de x0 é superior ao de x1
            let aux = x0;                           //Caso seja troca a ordem dos pontos
            x0 = x1;
            x1 = aux;
            aux = y0;
            y0 = y1;
            y1 = aux;
            dx = -dx;                               //e troca os deltas para os valores simétricos deles
            dy = -dy;
        }
        let pontos = [];                            //Variável que guarda os pontos calculados
        let y = y0;
        let incrementoE = 2 * dy;                   //Incremento para E
        let incrementoNE = 2 * (dy -dx);            //Incremento para NE
        let d = 2 * dy - dx;                        //Valor de calculo base para os incrementos
        for (let x = x0; x < x1; x++){               //Calcula os pontos
            pontos.push([x,y]);
            if(d <= 0){
                d += incrementoE;                   //Se d for negativo ou nulo incrementa d para E
            } else {
                y++;                                //Se d for positivo incrementa y
                d += incrementoNE;                  //e d incrementa para NE
            }
        }
        pontos.push([x1,y1]);                       //Adiciona a ultima coordenada da extremidade da linha
        for(let i = 0; i < pontos.length; i++){     //Percorre o arrei de pontos Para atualizar os valores com base nas variáveis auxiliares
            let x = pontos[i][0];
            let y = pontos[i][1];
            if(declive == true){                    //Verifica se existiu troca de coordenadas
                let aux = x;                        //Caso exista volta a trocar x com y (calculados)
                x = y;
                y = aux;
            }
            if(simetrico == true){                  //Verifica se existiu troca de valores para simétricos
                y = -y;                             //Caso exista volta a trocar y (calculado) para o seu simétrico
            }
            pontos[i]= [x,y];                       //Atualiza os valores no array de pontos
        }
        return pontos;
}