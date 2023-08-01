import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(SomeDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(SomeDto, plainObject, { excludeExtraneousValues: true });
}

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`
}
