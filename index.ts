import {v4 as uuidv4} from 'uuid';

export const LogFunc = (callMessage?: string, resultMessage?: string) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const debug = require('debug');
    const log = debug(`${target.constructor.name}:${propertyKey}`);
    const originalMethod = descriptor.value;
    const functionUUID = uuidv4();

    const cMessage = !!callMessage ? resultMessage : `Calling function '${propertyKey}'`;
    const rMessage = !!resultMessage ? resultMessage : `Function '${propertyKey}' responded.`;

    descriptor.value = function (...args: any) {
        log(`{"message": "${cMessage}", "UUID":"${functionUUID}", "args": ${JSON.stringify(args)}}`);
        const response = originalMethod.apply(this, args);
        log(`{"message": "${rMessage}", "UUID":"${functionUUID}", "response": ${JSON.stringify(response)}, "args": ${JSON.stringify(args)}}}`);
        
        return response;
    }
}