export class CreatePostDto {
  public postType: string;
  public title?: string;
  public link?: string;
  public preview?: string;
  public text?: string;
  public author?: string;
  public photo?: string;
  public description?: string;
  public tags?: number[];
  public userId: string;
}
