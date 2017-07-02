export default function getQuery(query: any) {
  return query = {
    limit: query.hasOwnProperty('page') ?
      query.hasOwnProperty('limit') ? parseInt(query.limit, 0) : 10 :
      query.hasOwnProperty('limit') ? parseInt(query.limit, 0) : 0,
    skip: query.hasOwnProperty('skip') ? parseInt(query.skip, 0) : 0,
    page: query.hasOwnProperty('page') ? parseInt(query.page, 0) : 0,
    type: query.hasOwnProperty('type') ? `${query.type}.*` : '',
    count: query.hasOwnProperty('count'),
  }
}