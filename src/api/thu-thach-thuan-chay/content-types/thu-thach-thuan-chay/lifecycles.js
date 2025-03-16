module.exports = {
  async afterUpdate(event) {
    const { result, params } = event;
    try {
      const routeVi = `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/challenge-life-vegan`;
      await fetch(routeVi);
      const routeEn = `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en/challenge-life-vegan`;
      await fetch(routeEn);
      await fetch(
        `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/`
      );
      await fetch(
        `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
