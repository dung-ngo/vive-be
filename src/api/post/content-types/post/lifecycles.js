async function revalidateNextRoutes(result) {
  try {
    const post = await strapi.db.query("api::post.post").findOne({
      select: ["slug"],
      where: { id: result.id },
      populate: { category: true },
    });
    const locale =
      result.locale === "vi"
        ? `post-detail/tin-tuc`
        : `${result.locale}/post-detail/news`;
    const route = `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/${locale}/${post.category.slug}/${result.slug}`;
    await fetch(route);

    await fetch(
      `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/news`
    );
    await fetch(
      `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en/news`
    );
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  async afterUpdate(event) {
    const { result, params } = event;
    await revalidateNextRoutes(result);
  },
  async afterCreate(event) {
    const { result, params } = event;
    await revalidateNextRoutes(result);
  },
  async afterDelete(event) {
    const { result, params } = event;
    await revalidateNextRoutes(result);
  },
};
