const amqp = require("amqplib/callback_api");

rabbitPrice = {};

rabbitPrice.consume = io => {
    const rabbit_username = process.env.RABBIT_USERNAME;
    const rabbit_password = process.env.RABBIT_PASSWORD;
    const rabbit_domain = process.env.RABBIT_DOMAIN;
    const rabbit_connectionstring = `amqp://${rabbit_username}:${rabbit_password}@${rabbit_domain}`;

    amqp.connect(rabbit_connectionstring, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = "LIVE_PRICE_QUEUE_1";
            channel.assertQueue(queue, { durable: false });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            channel.consume(
                queue,
                function(msg) {
                    io.sockets.emit("prices", msg.content.toString());
                    // console.log(" [x] Received %s", msg.content.toString());
                },
                {
                    noAck: true
                }
            );
        });
    });
};

module.exports = rabbitPrice;
