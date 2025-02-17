import { useParams } from 'react-router'

export function EditPublisher() {
  const { publisherId } = useParams()
  return <main>Edit publisher {publisherId}</main>
}
