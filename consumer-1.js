const amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'fabricio-siqueira',
    password: 'Fsj/82192263',
    vhost: '/',
    authMechanism:["PLAIN","AMQPLAIN","EXTERNAL"]

}

connect();

async function connect(){

    const queue = "clientes";
    const test = 3;

    try {

        const conn = await amqp.connect(rabbitSettings);
        console.log("Connection Created...");

        const channel = await conn.createChannel();
        console.log("Channel Created...");

        const res = await channel.assertQueue(queue);
        console.log("Queue Created...");

        console.log('Aguardando mensagem com propridade test: ' + test);
        channel.consume(queue, message => {
            let cliente = JSON.parse(message.content.toString());
            console.log(`Receber cliente ${cliente.student}`)
            console.log(cliente)

            // ler e apaga tudo da fia
            channel.ack(message);
        
            // Ler e apaga tudo da fila de acordo com a filtagragem
            /*if(cliente.test == test) {
                channel.ack(message);
                console.log("Mensagem deletada da queue...\n")
            }else{
                console.log("Essa mensagem nao é para mim, nao apaguarei...")
            }*/
        });

        
        
        
    } catch (err) {
        console.log(`Error -> ${err}`);
    }
}