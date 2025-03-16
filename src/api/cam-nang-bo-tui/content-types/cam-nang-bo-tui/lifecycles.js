module.exports = {
  async afterUpdate(event) {
    const { result, params } = event;
    try {
      const routeVi = `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/vegan-book`;
      await fetch(routeVi);
      const routeEn = `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en/vegan-book`;
      await fetch(routeEn);
    } catch (err) {
      console.log(err);
    }
  },
};
