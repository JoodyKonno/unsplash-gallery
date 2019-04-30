import AuthorModel from "./AuthorModel";

export default class PhotoModel {
  constructor(source) {
    this.id = source.id
    this.altDescription = source.alt_description
    this.createdAt = source.created_at
    this.description = source.description
    this.likes = source.likes
    this.tags = source.tags.map(tag => tag.title)
    this.fullImageSrc = source.urls.full
    this.rawImageSrc = source.urls.raw
    this.regularImageSrc = source.urls.regular
    this.smallImageSrc = source.urls.small
    this.thumbImageSrc = source.urls.thumb
    this.author = new AuthorModel(source.user)
  }
}
