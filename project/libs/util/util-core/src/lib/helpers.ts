import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(SomeDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(SomeDto, plainObject, { excludeExtraneousValues: true });
}
