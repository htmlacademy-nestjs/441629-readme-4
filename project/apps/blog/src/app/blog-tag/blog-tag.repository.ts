import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogTagEntity } from './blog-tag.entity';
import { Tag } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogTagRepository implements CRUDRepository<BlogTagEntity, number, Tag> {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public async create(item: BlogTagEntity): Promise<Tag> {
    return this.prisma.tag.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        tagId: id,
      }
    });
  }

  public findById(id: number): Promise<Tag | null> {
    return this.prisma.tag.findFirst({
      where: {
        tagId: id,
      }
    });
  }

  public find(ids: number[] = []): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        tagId: {
          in: ids.length > 0 ? ids : undefined,
        }
      }
    });
  }

  public update(id: number, item: BlogTagEntity): Promise<Tag> {
    return this.prisma.tag.update({
      where: {
        tagId: id,
      },
      data: { ...item.toObject(), tagId: id },
    });
  }
}
