module.exports = {
  async afterUpdate(event) {
    const { result, params } = event;
    try {
      await fetch(
        `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/faqs`
      );
      await fetch(
        `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en/faqs`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
