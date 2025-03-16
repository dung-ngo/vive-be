"use strict";
const { bootstrap } = require("./bootstrap");
const { ApplicationError } = require("@strapi/utils").errors;
const { getGraphQLRateLimiter } = require("graphql-rate-limit");
const rateLimiter = getGraphQLRateLimiter({ identifyContext: (ctx) => ctx.id });

module.exports = {
  async bootstrap() {
    await bootstrap();
  },

  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    const extension = ({}) => ({
      typeDefs: `
        type Contact {
          name: String
          email: String!
        }

        input DownloadBookInput {
          email: String!
          link: String!
          date: String!
        }

        type TrackingInfo {
          email: String!
          link: String!
          date: String!
        }

        input ContactInput {
          name: String
          email: String!
        }

        type Contact {
          name: String
          email: String!
        }

        type Mutation {
          subscribeListSubscribers(name: String, email: String!): Contact
          subscribeChallenge(name: String, email: String!): Contact
          subscribeEBook(name: String, email: String!): Contact
          subscribeContact(name: String!, email: String!, age: String!, message: String!): Contact
          downloadPocketBook(data: DownloadBookInput): TrackingInfo
        }
      `,
      resolvers: {
        Mutation: {
          subscribeListSubscribers: async (parent, args, context, info) => {
            const errorMessage = await rateLimiter(
              { parent, args, context, info },
              { max: 20, window: "60s" }
            );
            if (errorMessage) throw new Error(errorMessage);
            const subscribe = await fetch(`https://api.brevo.com/v3/contacts`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
              },
              body: JSON.stringify({
                email: args["email"],
                listIds: [parseInt(process.env.NEWSLETTER_CONTACT_ID)],
                updateEnabled: true,
              }),
            });

            if (subscribe.status === 204) {
              return { ...args };
            }
            const response = await subscribe.json();
            if (response.error) {
              throw new ApplicationError(response.error.message, 400);
            }
            return { ...args };
          },
          subscribeChallenge: async (parent, args, context, info) => {
            const errorMessage = await rateLimiter(
              { parent, args, context, info },
              { max: 20, window: "60s" }
            );
            if (errorMessage) throw new Error(errorMessage);
            const subscribe = await fetch(`https://api.brevo.com/v3/contacts`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
              },
              body: JSON.stringify({
                email: args["email"],
                attributes: {
                  FNAME: args["name"],
                },
                listIds: [parseInt(process.env.CHALLENGE_SIGN_UP_CONTACT_ID)],
                updateEnabled: true,
              }),
            });

            const response = await subscribe.json();
            console.log("response", response);
            if (response.error) {
              throw new ApplicationError(response.error.message, 400);
            }
            return { ...args };
          },
          subscribeEBook: async (parent, args, context, info) => {
            const errorMessage = await rateLimiter(
              { parent, args, context, info },
              { max: 20, window: "60s" }
            );
            if (errorMessage) throw new Error(errorMessage);
            const subscribe = await fetch(`https://api.brevo.com/v3/contacts`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
              },
              body: JSON.stringify({
                email: args["email"],
                listIds: [parseInt(process.env.EBOOK_CONTACT_ID)],
                updateEnabled: true,
              }),
            });
            const response = await subscribe.json();
            console.log("response", response);
            if (response.error) {
              throw new ApplicationError(response.error.message, 400);
            }
            return { ...args };
          },
          subscribeContact: async (parent, args, context, info) => {
            const errorMessage = await rateLimiter(
              { parent, args, context, info },
              { max: 20, window: "60s" }
            );
            if (errorMessage) throw new Error(errorMessage);
            const subscribe = await fetch(`https://api.brevo.com/v3/contacts`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
              },
              body: JSON.stringify({
                email: args["email"],
                listIds: [parseInt(process.env.NEWSLETTER_CONTACT_ID)],
                updateEnabled: true,
              }),
            });
            const response = await subscribe.json();
            console.log("response", response);
            if (response.error) {
              throw new ApplicationError(response.error.message, 400);
            }
            return { ...args };
          },
          downloadPocketBook: async (parent, args, context, info) => {
            const errorMessage = await rateLimiter(
              { parent, args, context, info },
              { max: 20, window: "60s" }
            );
            if (errorMessage) throw new Error(errorMessage);
            const { email, link, date } = args.data;
            await strapi.entityService.create(
              "api::tracking-list.tracking-list",
              {
                data: { email, link, date },
              }
            );
            return { email, link, date };
          },
        },
      },
      resolversConfig: {
        "Mutation.subscribeListSubscribers": {
          auth: false,
        },
        "Mutation.subscribeChallenge": {
          auth: false,
        },
        "Mutation.subscribeEBook": {
          auth: false,
        },
        "Mutation.subscribeContact": {
          auth: false,
        },
        "Mutation.downloadPocketBook": {
          auth: false,
        },
      },
    });
    extensionService.use(extension);
  },
};
