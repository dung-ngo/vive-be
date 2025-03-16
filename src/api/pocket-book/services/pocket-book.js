'use strict';

/**
 * pocket-book service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pocket-book.pocket-book');
