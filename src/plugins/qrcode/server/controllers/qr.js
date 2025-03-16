'use strict';

module.exports = ({ strapi }) => ({
  async index(ctx) {
    let pocketBook = await strapi.entityService.findMany('api::pocket-book.pocket-book', {
      filters: {
        plugins: ["*"]
      },
      populate : ['*']
    });
    let webAPI = process.env.NEXT_WEB_API;
    if (!webAPI) {
      webAPI = "https://www.vive.org.vn";
    }
    const webHost = new URL(webAPI).origin;
    const token = this.generateToken();
    const defaultQRCode = `${webHost}/pocket-book?viveToken=${token}`;
    if (!pocketBook) {
      pocketBook = await strapi.entityService.create('api::pocket-book.pocket-book', {
        data : {
          qrCode: defaultQRCode
        }
      });
    }
    if (!pocketBook?.qrCode) {
      pocketBook.qrCode = defaultQRCode;
    }
    ctx.body = pocketBook;
    return;
  },
  async update(ctx) {
    const { id, qrCode } = ctx.request.body;
    if (!id || !qrCode) {
      return ctx.badRequest('Missing required fields: id and qrCode');
    }

    const pocketBook = await strapi.entityService.update('api::pocket-book.pocket-book', id, {
      data : {
        qrCode
      }
    })
    ctx.body = {...pocketBook, qrCode};
    return;
  },

  generateToken() {
    return Math.random().toString(36).substring(2);
  }
});
