import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { BlogPostEntity } from './blog-post.entity';
import { Post } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { PostQuery } from './query/post.query';

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public async create(item: BlogPostEntity): Promise<Post> {
    const entityData = item.toObject();

    return this.prisma.post.create({
      data: {
        ...entityData,
        comments: {
          connect: [],
        },
        tags: {
          connect: entityData.tags.map(({ tagId }) => ({ tagId }))
        }
      },
      include: {
        comments: true,
        tags: true,
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId: id,
      }
    });
  }

  public async findById(id: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: {
        postId: id,
      },
      include: {
        comments: true,
        tags: true,
      }
    });
  }

  public find({ limit, tags, sortDirection, page }: PostQuery): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        tags: {
          some: {
            tagId: {
              in: tags,
            }
          }
        }
      },
      take: limit,
      include: {
        comments: true,
        tags: true,
      },
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item: BlogPostEntity): Promise<Post> {
    return Promise.resolve(undefined);
  }
}
