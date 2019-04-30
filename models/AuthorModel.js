export default class AuthorModel {
  constructor(source) {
    this.id = source.id
    this.username = source.username
    this.firstName = source.first_name
    this.lastName = source.last_name
    this.bio = source.bio
    this.profileImageSmall = source.profile_image.small
    this.profileImageMedium = source.profile_image.medium
    this.profileImageLarge = source.profile_image.large
  }
}
