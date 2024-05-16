const robotsTxt = `
  User-agent: *
  Allow: /
  Sitemap: ${import.meta.env.SITE}/sitemap-index.xml
`;

export const GET = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
