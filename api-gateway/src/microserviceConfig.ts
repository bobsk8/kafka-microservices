import {KafkaOptions, Transport} from "@nestjs/microservices";

export const microserviceConfig: KafkaOptions = {
    transport: Transport.KAFKA,

    options: {
        client: {
            clientId: 'api-gateway',
            brokers: ["127.0.0.1:19092", "127.0.0.1:29092", "127.0.0.1:39092"],
        },
        consumer: {
            groupId: 'api-gateway-consumer',
            allowAutoTopicCreation: true,
        },
    }
};