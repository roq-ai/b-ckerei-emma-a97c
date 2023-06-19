const mapping: Record<string, string> = {
  bakeries: 'bakery',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
