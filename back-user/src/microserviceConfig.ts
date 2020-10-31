import {KafkaOptions, Transport} from "@nestjs/microservices";

export const microserviceConfig: KafkaOptions = {
    transport: Transport.KAFKA,

    options: {
        client: {
            clientId: 'user',
            brokers: ["127.0.0.1:19092", "127.0.0.1:29092", "127.0.0.1:39092"],
        },
        consumer: {
            groupId: 'user-consumer',
            allowAutoTopicCreation: true,
        },
    }
};