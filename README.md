# Aplicação: RentCars

Bem-vindo ao RentCar, a solução perfeita para facilitar o processo de aluguel de carros. Uma experiência prática e eficiente para alugar o veículo.

Com uma ampla variedade de dados, desde informações sobre veículos e disponibilidade até perfis de usuários e transações. O backend, construído com segurança em mente, protege esses dados preciosos para que você possa ter tranquilidade enquanto aproveita a experiência de aluguel de carros. 

Um backend robusto é a base para uma experiência de aluguel de carros excepcional. Nosso sistema backend foi projetado com tecnologia de ponta para garantir que você tenha um processo simplificado, seguro e eficiente do início ao fim.


**TÉCNOLOGIAS UTILIZADAS**
TypeScript
Node.JS
TypeORM
Docker


### Como funciona

**Cadastros e Logins**
É possível cadastrar um novo carro.
É cadastrar uma especificação para um carro
É possível cadastrar a imagem do carro
É possível cadastrar um aluguel
Deve ser possível o usuário recuperar a senha informando o e-mail
O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
O usuário deve conseguir inserir uma nova senha
O usuário precisa informar uma nova senha
O link enviado para a recuperação deve expirar em 3 horas

**Aluguel**
O aluguel deve ter duração mínima de 24 horas.
Ao realizar um aluguel, o status do carro deverá ser - alterado para indisponível
O usuário deve estar logado na aplicação
Deve ser possível realizar a busca de todos os alugueis para o usuário
Ao realizar a devolução, o carro deverá ser liberado para - outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado - para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do - aluguel.
Caso o horário de devolução seja superior ao horário - previsto de entrega, deverá ser cobrado multa - proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.

