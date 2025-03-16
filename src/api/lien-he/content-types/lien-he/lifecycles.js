module.exports = {
  async afterUpdate(event) {
    const { result, params } = event;
    try {
      const routeVi = `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/contact-us`;
      await fetch(routeVi);
      const routeEn = `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en/contact-us`;
      await fetch(routeEn);
    } catch (err) {
      console.log(err);
    }
  },
};
