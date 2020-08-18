import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTagService from '@modules/tags/services/CreateTagService';
import FindAllTagsService from '@modules/tags/services/FindAllTagsService';

export default class TagsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const findOrCreateTag = container.resolve(CreateTagService);
    const tag = await findOrCreateTag.execute(name);

    return response.json(tag);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const findTags = container.resolve(FindAllTagsService);
    const tags = await findTags.execute();

    return response.json(tags);
  }
}
