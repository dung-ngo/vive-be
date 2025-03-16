async function revalidateNextRoutes(result) {
  try {
    const locale =
      result.locale === "vi"
        ? "review-restaurant-detail/"
        : `${result.locale}/review-restaurant-detail/`;

    await fetch(
      `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/${locale}${result.slug}`
    );

    await fetch(
      `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/vegan-food`
    );
    await fetch(
      `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en/vegan-food`
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
