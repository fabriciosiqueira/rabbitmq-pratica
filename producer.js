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

    const queue = "empregados";
    const newQueue = "clientes";

    const msgs = [
        {
            name:"Praticando uso de RabbitMQ",
            student: "Fabricio Siqueira de Jesus",
            test:0
        },
        {
            name:"Praticando uso de RabbitMQ",
            student: "Fabricio Siqueira de Jesus",
            test:1
        },
        {
            name:"Praticando uso de RabbitMQ",
            student: "Fabricio Siqueira de Jesus",
            test:2
        },
        {
            name:"Praticando uso de RabbitMQ",
            student: "Fabricio Siqueira de Jesus",
            test:3
        },
        {
            name:"Praticando uso de RabbitMQ",
            student: "Fabricio Siqueira de Jesus",
            test:4
        }
    ];

    try {

        const conn = await amqp.connect(rabbitSettings);
        console.log("Connection Created...");

        const channel = await conn.createChannel();
        console.log("Channel Created...");

        let res = await channel.assertQueue(queue);
        console.log("Queue Created...");

        for(let msg in msgs) {
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log(`Message has sent to queue ${queue}`)
        }



        res = await channel.assertQueue(newQueue);
        console.log("Queue Created...");

        for(let msg in msgs) {
            await channel.sendToQueue(newQueue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log(`Message has sent to queue ${newQueue}`)
        }

        
        
    } catch (err) {
        console.log(`Error -> ${err}`);
    }
}