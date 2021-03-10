# rabbitmq-pratica
Conhecendo, estudando e praticando mensageria com RabbitMQ e NodeJS

Step 1: Criar a RabbitMQ no Docker:

docker run -d -p 15672:15672 -p 5672:5672 --name rabbitmq rabbitmq:3-management

* login e senha padrao é: login: guest, password: guest .Dentro da interface você poderá modificar acessando localhost:5672

Agora você ja pode testar os arquivos producer.js, consumer-0.js e consumer-1.js. No produce.js  poderá gerar empregados e 
clientes, no arquivo consumer-0 poderá consume a fila de empregados perfilados pelo producer.js e
no arquivo consumer-1.js irá consumir a fila de clientes perfilados pelo producer.js.


