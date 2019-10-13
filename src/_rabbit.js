var amqp = require("amqplib/callback_api");

rabbit = {};

rabbit.startTrader = body => {
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
      var queue = "START_TRADER";

      channel.assertQueue(queue, {
        durable: false
      });

      body_json = JSON.stringify(body);
      channel.sendToQueue(queue, Buffer.from(body_json));
      console.log(" [x] Sent %s", body_json);
    });
  });
};

rabbit.testRabbit = () => {
  try {
    console.log("Testing...");
    const rabbit_username = process.env.RABBIT_USERNAME;
    const rabbit_password = process.env.RABBIT_PASSWORD;
    const rabbit_domain = process.env.RABBIT_DOMAIN;
    const rabbit_connectionstring = `amqps://${rabbit_username}:${rabbit_password}@10.244.0.53`;
    console.log(rabbit_connectionstring);
    amqp.connect(rabbit_connectionstring, function(error0, connection) {
      console.log("connecting...");
      if (error0) {
        console.log(error0);
        throw error0;
      }

      connection.createChannel(function(error1, channel) {
        if (error1) {
          console.log(error1);
          throw error1;
        }
        var queue = "TEST_RABBIT";

        channel.assertQueue(queue, {
          durable: false
        });
        const now = Date.now();

        body_json = JSON.stringify({
          name: "test-rabbit",
          time: now
        });

        channel.sendToQueue(queue, Buffer.from(body_json));
        console.log(" [x] Sent %s", body_json);
      });
    });
  } catch {
    console.log("An error occurred!");
    // console.log(err);
  }
};

module.exports = rabbit;
