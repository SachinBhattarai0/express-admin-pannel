import paginate from "jw-paginate";

export function paginator(
  options: any[],
  page: string | number,
  pageSize: number = AdminPannelOptions?.noOfItemsPerPage || 30
) {
  if (typeof page === "string") page = parseInt(page);
  if (!page) page = 1;

  const pager = paginate(options.length, page, pageSize);
  const paginatedOptions = options.slice(pager.startIndex, pager.endIndex + 1);

  return { options: paginatedOptions, pager };
}
