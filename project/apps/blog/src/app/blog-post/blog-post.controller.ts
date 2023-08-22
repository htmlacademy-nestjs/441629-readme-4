import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { fillObject } from '@project/util/util-core';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) { }

  @Get('/:id')
  async show(
    @Param('id') id: string,
  ) {
    const post = await this.blogPostService.getPost(parseInt(id, 10));
    return fillObject(PostRdo, post);
  }

  @Get('/')
  async index() {
    const posts = await this.blogPostService.getPosts();
    return fillObject(PostRdo, posts);
  }

  @Post('/')
  async create(
    @Body() dto: CreatePostDto,
  ) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillObject(PostRdo, newPost);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(
    @Param('id') id: string,
  ) {
    this.blogPostService.deletePost(parseInt(id, 10));
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ) {
    const updatedPost = await this.blogPostService.updatePost(parseInt(id, 10), dto);
    return fillObject(PostRdo, updatedPost);
  }
}
