Here is a link to the live site: https://fgv-vis-2023.github.io/assignment-3-fetal_health_classification/

## Decisões de design
A visualização principal foi feita visando dar um apoio visual para obstetras conseguirem classificar da saúde de um feto dado um exame de cardiotocograma, tendo o apoio visual de outros vários exames que já estão classificados (nossa base de dados), como o exame resulta dados quantitativos, uma escolha um tanto clara foi a do scatterplot, onde conseguimos mostrar muita informação quantitativa junta de uma forma bem confortável e é uma representação visual que permite enxergar clusters e tendencias de forma muito clara, o que é muito importante para nosso objetivo. O scatterplot por padrão conseguiria representar bem duas variáveis quantitativas, com o eixo x e o eixo y, para aumentar a quantidade de informação em um mesmo gráfico, adicionamos uma variável no tamanho de cada ponto, e a nossa variável categórica, a classificação da saúde do feto, é bem representada por cores. 

Utilizando interação conseguimos escolher os valores de x, y, e o raio do ponto, dessa forma conseguimos representar muitos gráficos diferentes em uma única visualização, ajustada da maneira que o obstetra desejar. Além disso, pensamos em uma maneira de facilitar a procura de clusters, então inicialmente pensamos em fazer um zoom na área desejada, mas pensamos que assim perdia a noção geral, das redondezas, então escolhemos implementar o brush, onde conseguimos separar a informação em uma área específica desejada do gráfico e ainda temos a noção geral de distribuição dos pontos. 
Além disso, conseguimos mostrar estatísticas gerais sobre os dados que estão selecionados no brush ou de forma geral, ajudando muito a análise e compreensão da distribuição dos dados.

Nossa seleção de cores para representar nossa variável categórica foi feita visando o sistema de cores CMYK, pois essa é uma seleção de cores própria para ajudar no problema de sobreposição de pontos, com ela quanto mais pontos sobrepostos mais escura vai ficar a parte do gráfico, e assim fica mais clara essa sobreposição de diversos pontos.

## Desenvolvimento
Iniciamos o trabalho de maneira a cada um fazer uma exploração inicial e partindo dessa exploração de tipos de gráficos e recursos disponíveis escolher uma visualização final. Vinicius inicialmente fez o heatmap, que foi utilizado na entrega fina como uma visualização secundaria, Raul fez um scatterplot simples, com uma tentativa de fazer interação com brush, e o Kayo fez o scatterplot com a interação de trocar o valor dos eixos, nesse ponto todos nos voltamos para a representação que Kayo iniciou e tentando melhorá-la o máximo possível para o MVP. 

Após a apresentação do MVP, nos juntamos para tentar arrumar todas as críticas que julgamos realmente interessante para nosso objetivo, onde cada integrante do grupo pegou alguns pontos para corrigir e desenvolveu eles. Era uma quantidade extensa de pontos que consideravam diversos pontos distintos como funcionamento do brush, adição de mais informação estatística e melhor explicação sobre a base de dados e o objetivo da visualização. 
Estimamos ter investidos cerca de 32 horas, por pessoa, para esse trabalho, considerando uma estimativa conservadora. A estimativa foi feita considerando que gastamos certa de 6 horas durante 2 dias para a entrega do MVP e 5 horas durante 4 dias para implementar todos os pontos comentados pelos nossos colegas de classe. 

## Dados
Extraímos esse conjunto de dados do kaggle, é possível clicar ![aqui](https://www.kaggle.com/datasets/andrewmvd/fetal-health-classification) para ver a base. 

