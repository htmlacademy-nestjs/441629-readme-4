import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BlogTagService } from './blog-tag.service';
import { fillObject } from '@project/util/util-core';
import { TagRdo } from './rdo/tag-rdo';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class BlogTagController {
  constructor(
    private readonly blogTagService: BlogTagService
  ) { }

  @Get('/')
  async index() {
    const tags = await this.blogTagService.getTags();
    return fillObject(TagRdo, tags);
  }

  @Post('/')
  async create(
    @Body() dto: CreateTagDto,
  ) {
    const newTag = await this.blogTagService.createTag(dto);
    return fillObject(TagRdo, newTag);
  }

  @Get('/:id')
  async show(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const existTag = await this.blogTagService.getTag(id);
    return fillObject(TagRdo, existTag);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.blogTagService.deleteTag(id);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTagDto,
  ) {
    const updatedTag = await this.blogTagService.updateTag(id, dto);
    return fillObject(TagRdo, updatedTag);
  }
}
