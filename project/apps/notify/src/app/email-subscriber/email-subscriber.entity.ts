import { Subscriber } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public userId: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.firstname = entity.firstname;
    this.lastname = entity.lastname;
    this.id = entity.id;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
