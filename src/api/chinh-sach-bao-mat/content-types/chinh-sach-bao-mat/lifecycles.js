module.exports = {
  async afterUpdate(event) {
    const { result, params } = event;
    try {
      await fetch(
        `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/policy/chinh-sach-bao-mat`
      );
      await fetch(
        `${process.env.NEXT_WEB_API}/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=/en/policy/privacy-policy`
      );
    } catch (err) {
      console.log(err);
    }
  },
};
