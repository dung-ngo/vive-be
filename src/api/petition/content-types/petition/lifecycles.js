module.exports = {
  async afterUpdate(event) {
    const { result, params } = event;
    try {
      const slug = result.slug;

      if (slug) {
        await fetch(
          `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/petition/${slug}`
        );
        await fetch(
          `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en/petition/${slug}`
        );
      } else {
        console.log("No slug found in the result, skipping revalidation");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
