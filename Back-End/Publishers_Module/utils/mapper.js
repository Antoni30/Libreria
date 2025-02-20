export function mapPublisherDb(publisherDb) {
  const publisherMapped = {
    id: publisherDb.id_publisher,
    name: publisherDb.publisher_name,
    address: publisherDb.publisher_address,
    phone: publisherDb.publisher_phone,
    email: publisherDb.publisher_email,
  };

  return publisherMapped;
}
