import { g } from '../constants/Constants'

export default function fullImageUrl(path) {
  return g.IMAGE_BASE + encodeURIComponent(path)
}