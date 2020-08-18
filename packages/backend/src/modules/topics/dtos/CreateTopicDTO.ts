interface ITag {
  tagId: string;
}

export default interface CreateTopicDTO {
  title: string;
  text: string;
  userId: string;
  tags: ITag[];
}
